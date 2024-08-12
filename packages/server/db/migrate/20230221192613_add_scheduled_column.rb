class AddScheduledColumn < ActiveRecord::Migration[6.1]
  def change
    add_column(:posts, :scheduled, :datetime, default: nil, null: true)
  end
end
