class UserPasskey < ApplicationRecord
  self.primary_key = :webauthn_id

  belongs_to :user

  validates :name, uniqueness: {
    scope: :user,
    message: "A passkey with that name is already registered"
  }

  def as_json(options)
    options[:except] ||= []
    options[:except] << :webauthn_id
    options[:except] << :public_key
    options[:except] << :sign_count
    super(options)
  end
end
