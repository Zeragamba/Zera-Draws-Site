class AuthController < ApplicationController
  before_action :authenticate_user, :except => [
    :register,
    :login_password,
    :login_passkey_challenge,
    :login_passkey_validate,
  ]

  def register
    raise NotImplementedError
  end

  def login_password
    user = User.where('LOWER(username) = :username', username: params[:username].downcase).first
    raise AuthError, "Invalid user or password" if !user&.authenticate(params[:password])
    self.login_success(user)
  end

  def list_passkeys
    user = Current.user
    render json: PasskeyView.render_list(user.passkeys)
  end

  def register_passkey_challenge
    Rails.logger.info("Starting challenge of passkey for user")
    user = Current.user

    passkey = UserPasskey.new(name: passkey_params[:name], user: user)
    raise ActiveRecord::RecordInvalid.new(passkey) if passkey.invalid?

    if !user.webauthn_id
      user.update!(webauthn_id: WebAuthn.generate_user_id)
    end

    options = WebAuthn::Credential.options_for_create(
      user: { id: user.webauthn_id, name: user.username },
      exclude: user.passkeys.map { |key| key.webauthn_id }
    )

    render json: options
  end

  def register_passkey_validate
    Rails.logger.info("Starting validate of passkey for user")
    user = Current.user

    webauthn_credential = WebAuthn::Credential.from_create(params[:publicKeyCredential])
    webauthn_credential.verify(params[:challenge])

    # Store Credential ID, Credential Public Key and Sign Count for future authentications
    passkey = user.passkeys.create!(
      name: passkey_params[:name],
      webauthn_id: webauthn_credential.id,
      public_key: webauthn_credential.public_key,
      sign_count: webauthn_credential.sign_count
    )

    render json: PasskeyView.render(passkey)
  rescue WebAuthn::Error => e
    Rails.logger.error (["#{self.class} - #{e.class}: #{e.message}"] + e.backtrace).join("\n")
    raise BadRequestError, "Unable to validate passkey"
  end

  def login_passkey_challenge
    render json: WebAuthn::Credential.options_for_get
  end

  def login_passkey_validate
    Rails.logger.info("Starting validate of passkey for login")
    webauthn_credential = WebAuthn::Credential.from_get(params[:publicKeyCredential])

    Rails.logger.info("attempting login for public key #{webauthn_credential.id}")
    stored_credential = UserPasskey.find_by(webauthn_id: webauthn_credential.id)
    raise BadRequestError, "Passkey not found" if stored_credential.nil?

    webauthn_credential.verify(
      params[:challenge],
      public_key: stored_credential.public_key,
      sign_count: stored_credential.sign_count
    )
    user = stored_credential.user
    Rails.logger.info("Challenge passed for user #{user.username}")

    Rails.logger.debug("Updating sign count for passkey")
    stored_credential.update!(sign_count: webauthn_credential.sign_count)

    Rails.logger.debug("Passkey login success")
    self.login_success(stored_credential.user)
  rescue WebAuthn::SignCountVerificationError
    # Cryptographic verification of the authenticator data succeeded, but the signature counter was less then or equal
    # to the stored value. This can have several reasons and depending on your risk tolerance you can choose to fail or
    # pass authentication. For more information see https://www.w3.org/TR/webauthn/#sign-counter
    self.login_success(user)
  rescue WebAuthn::Error => e
    Rails.logger.error (["#{self.class} - #{e.class}: #{e.message}"] + e.backtrace).join("\n")
    raise AuthError, "Unable to validate passkey"
  end

  def update_passkey
    Rails.logger.info("Starting update of passkey for user")
    user = Current.user

    passkey = user.passkeys.find(params[:passkey_id])
    passkey.update!(passkey_params)

    render json: PasskeyView.render(passkey)
  end

  def remove_passkey
    Rails.logger.info("Starting removal of passkey for user")
    user = Current.user

    passkey = user.passkeys.find(params[:passkey_id])
    passkey.destroy!

    render json: PasskeyView.render(passkey)
  end

  def login_success(user)
    Current.user = user
    auth_token = AuthToken.encode(user)
    render json: UserView.render(Current.user, auth_token: auth_token)
  end

  def logout
    Current.user = nil
    render json: { success: true }
  end

  private

    def passkey_params
      params.require(:passkey).permit(:name)
    end
end
