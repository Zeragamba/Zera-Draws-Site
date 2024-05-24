class PasskeyView < ApplicationView
  def self.as_json(passkey)
    return {
      id: passkey.webauthn_id,
      name: passkey.name,
      createdAt: passkey.created_at,
    }
  end

  def self.render_list(passkeys)
    return self.render_many(
      count: passkeys.size,
      page: 1,
      total_pages: 1,
      model: :passkeys,
      data: passkeys.map { |passkey| self.as_json(passkey) }
    )
  end

  def self.render(passkey)
    return self.render_one(
      model: :passkey,
      data: self.as_json(passkey),
    )
  end
end
