class Slug < ActiveRecord::Type::String
  def self.to_slug(name)
    return name
      .downcase
      .gsub(/[^\w-]/, ' ')
      .strip
      .gsub(/ +/, '-')
  end
end
