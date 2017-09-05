class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :session_token
      t.string :digest

      t.timestamps
    end

	add_index :users, :username
  end
end
