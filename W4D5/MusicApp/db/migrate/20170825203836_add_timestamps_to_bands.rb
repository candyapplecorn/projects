class AddTimestampsToBands < ActiveRecord::Migration[5.1]
  def change
    add_column :bands, :created_at, :datetime, null: false
    add_column :bands, :updated_at, :datetime, null: false
  end
end
