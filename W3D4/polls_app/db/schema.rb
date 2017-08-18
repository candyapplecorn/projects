# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170817232942) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answer_choices", force: :cascade do |t|
    t.integer "question_id"
    t.text "body"
    t.index ["question_id"], name: "index_answer_choices_on_question_id"
  end

  create_table "polls", force: :cascade do |t|
    t.integer "author_id"
    t.string "title"
    t.index ["author_id"], name: "index_polls_on_author_id"
  end

  create_table "questions", force: :cascade do |t|
    t.integer "poll_id"
    t.text "body"
    t.index ["poll_id"], name: "index_questions_on_poll_id"
  end

  create_table "responses", force: :cascade do |t|
    t.integer "respondent_id"
    t.integer "answer_choice_id"
    t.index ["answer_choice_id"], name: "index_responses_on_answer_choice_id"
    t.index ["respondent_id"], name: "index_responses_on_respondent_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
  end

end
