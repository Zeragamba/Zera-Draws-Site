module WithOrder
  extend ActiveSupport::Concern

  included do
    before_validation :set_order
  end

  def set_order
    self.order ||= self.class.maximum(:order) + 1
  end
end
