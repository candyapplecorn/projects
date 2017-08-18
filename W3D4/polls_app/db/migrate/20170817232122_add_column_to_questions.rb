class AddColumnToQuestions < ActiveRecord::Migration[5.1]
  def change
    add_column :questions, :poll_id, :integer
    add_column :questions, :body, :text

    add_column :responses, :respondent_id, :integer
    add_column :responses, :answer_choice_id, :integer
  end
end
