class MigrateDateFieldToTimestamp < ActiveRecord::Migration[6.1]
  def up
    change_column(:posts, :date, :timestamp, default: -> { "CURRENT_TIMESTAMP" })
  end

  def down
    change_column(:posts, :date, :date, default: -> { "CURRENT_DATE" })
  end
end
