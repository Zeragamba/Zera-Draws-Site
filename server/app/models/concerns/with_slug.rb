require_relative '../../lib/uuid'

module WithSlug
  extend ActiveSupport::Concern

  class_methods do
    def find(id_or_slug)
      if UUID.is_uuid?(id_or_slug)
        self.find_by_id!(id_or_slug)
      else
        self.find_by_slug!(id_or_slug)
      end
    end
  end

  included do
    before_validation :update_slug

    validates_presence_of :slug
    validates_uniqueness_of :slug

    def build_slug
      raise NotImplementedError
    end

    def update_slug
      self.slug = Slug.to_slug(self.slug || self.build_slug)
    end
  end
end
