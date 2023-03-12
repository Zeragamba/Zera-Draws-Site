class Slug < ActiveRecord::Type::String
  def self.to_slug(name)
    return name
      .downcase
      .gsub(/\W+/, ' ')
      .strip
      .gsub(/\s+/, '-')
  end
end
