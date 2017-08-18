class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.integer :poll_id
      t.text :body
    end
    add_index :poll_id
  end
end
