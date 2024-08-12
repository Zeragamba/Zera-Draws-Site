class RemovePostDateField < ActiveRecord::Migration[6.1]
  def change
    change_column_null(:posts, :date, false)
    change_column_default(:posts, :date, from: nil, to: -> { 'CURRENT_DATE' })
  end
end
