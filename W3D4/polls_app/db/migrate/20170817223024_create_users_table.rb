class CreateUsersTable < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
    end
    add_index :name, unique: true
  end
end
