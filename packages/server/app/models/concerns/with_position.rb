module WithPosition
  extend ActiveSupport::Concern

  included do
    before_create -> { self.position = (self.class.maximum(:position) || 0) + 1 }

    def position=(new_position)
      return super(new_position) if self.new_record?

      cur_position = self.position.to_i
      new_position = new_position.to_i

      return if new_position == cur_position

      moved_items = self.class
        .where("position >= :min", min: [new_position, cur_position].min)
        .where("position <= :max", max: [new_position, cur_position].max)

      if new_position > cur_position
        self.class.update_counters(moved_items, position: -1)
      else
        self.class.update_counters(moved_items, position: +1)
      end

      self.update_column(:position, new_position)
    end
  end
end
