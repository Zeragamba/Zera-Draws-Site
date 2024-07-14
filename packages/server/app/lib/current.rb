class Current < ActiveSupport::CurrentAttributes
  attribute :user

  def admin?
    return self.user&.admin || false
  end
end
