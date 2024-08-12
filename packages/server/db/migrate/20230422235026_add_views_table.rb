class AddViewsTable < ActiveRecord::Migration[6.1]
  def change
    create_table :views, id: :uuid, add_timestamps: false do |t|
      t.timestamp :timestamp, index: true, null: false, default: -> { "CURRENT_TIMESTAMP" }
      t.uuid :viewer_id, index: true, null: false
      t.references(:post, type: :uuid, foreign_key: true)
    end
  end
end
