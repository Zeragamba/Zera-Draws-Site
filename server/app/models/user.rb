class User < ApplicationRecord
  has_secure_password
  has_many :passkeys, :class_name => "UserPasskey"

  def as_json(options)
    options[:except] ||= []
    options[:except] << :password_digest
    options[:except] << :webauthn_id
    super(options)
  end
end
