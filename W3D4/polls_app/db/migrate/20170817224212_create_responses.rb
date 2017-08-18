class CreateResponses < ActiveRecord::Migration[5.1]
  def change
    create_table :responses do |t|
      t.integer :respondent_id
      t.integer :answer_choice_id
    end
    add_index :respondent_id
    add_index :answer_choice_id
  end
end
