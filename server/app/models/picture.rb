class Picture < ApplicationRecord
  has_and_belongs_to_many :tags
  eager_load :tags

  def add_tags(*tag_names)
    tag_names.each do |tag_name|
      self.tags << Tag.find_or_create(tag_name)
    end

    return self
  end

  def to_presenter(**args)
    return PicturesPresenter.new(picture: self, **args)
  end
end
