require_relative 'QuestionsDB'
require_relative 'Questions'
require 'byebug'

class User
  attr_accessor :id, :fname, :lname
    def self.find_by_name(first_name, last_name)
      user = QuestionsDB.instance.execute(<<-SQL, first_name, last_name)
          SELECT * FROM users WHERE fname = ? AND lname = ?
      SQL
      return nil if user.empty?

      self.new(user.first)
    end

    def authored_questions
      Question.find_by_author_id(@id)
    end

    def authored_replies
      Reply.find_by_user_id(@id)
    end

    def self.all
      data = QuestionsDB.instance.execute("SELECT * FROM users")
      data.map { |dat_piece| self.new(dat_piece) }
    end

    def initialize(options)
      @id = options['id']
      @fname = options['fname']
      @lname = options['lname']
    end

    def create
      raise "#{self} already exists" if @id

      QuestionsDB.instance.execute(<<-SQL, @fname, @lname )
        INSERT INTO
          users (fname, lname)
        VALUES
          (?, ?)
      SQL

      @id = QuestionsDB.instance.last_insert_row_id
    end

end
