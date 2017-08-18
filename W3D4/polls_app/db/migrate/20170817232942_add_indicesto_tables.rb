class AddIndicestoTables < ActiveRecord::Migration[5.1]
  def change
    rename_column :answer_choices, :question, :question_id
    rename_column :polls, :author, :author_id

    add_index :answer_choices, :question_id

    add_index :responses, :respondent_id
    add_index :responses, :answer_choice_id

    add_index :questions, :poll_id
    add_index :polls, :author_id
  end
end
