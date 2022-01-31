class User < ApplicationRecord
  has_secure_password

  def as_json(options)
    options[:except] ||= []
    options[:except] << :password_digest
    super(options)
  end
end
