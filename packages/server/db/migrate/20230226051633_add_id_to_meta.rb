class AddIdToMeta < ActiveRecord::Migration[6.1]
  def change
    add_column(:meta, :id, :uuid, primary_key: true, default: -> { "gen_random_uuid()" })
  end
end
