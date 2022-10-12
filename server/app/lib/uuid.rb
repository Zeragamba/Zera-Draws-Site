module UUID
  def self.is_uuid?(string)
    uuid_regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    return uuid_regex.match?(string.to_s.downcase)
  end
end
