class DropColumnsNameAndEmailFromUsers < ActiveRecord::Migration[5.1]
  def change
		remove_column :users, :email
		rename_column :users, :name, :username
		change_column :users, :username, :string, null: false
  end
end
