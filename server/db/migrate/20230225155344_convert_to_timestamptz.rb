class ConvertToTimestamptz < ActiveRecord::Migration[6.1]
  def up
    change_column(:posts, :date, 'timestamptz')
    change_column(:posts, :scheduled, 'timestamptz')
  end

  def down
    change_column(:posts, :date, :timestamp)
    change_column(:posts, :scheduled, :timestamp)
  end
end
