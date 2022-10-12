class Gallery < ApplicationRecord
  include WithSlug

  has_and_belongs_to_many :pictures

  def build_slug
    self.name
  end
end
