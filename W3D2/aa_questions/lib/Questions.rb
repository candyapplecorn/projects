require_relative 'QuestionsDB'
require 'byebug'

class Question
    attr_accessor :id, :title, :author_id, :body

    def self.find_by_author_id(author_id)
      question = QuestionsDB.instance.execute(<<-SQL, author_id)
          SELECT * FROM questions WHERE author_id = ?
      SQL
      return nil if question.empty?
      self.new(question.first)
    end

    def self.find_by_id(id)
      question = QuestionsDB.instance.execute(<<-SQL, id)
          SELECT * FROM questions WHERE id = ?
      SQL
      return nil if question.empty?
      self.new(question.first)
    end

    def self.all
      data = QuestionsDB.instance.execute("SELECT * FROM questions")
      data.map { |dat_piece| self.new(dat_piece) }
    end

    def initialize(options)
      @id = options['id']
      @title = options['title']
      @author_id = options['author_id']
      @body = options['body']
    end

    def author
        QuestionsDB.instance.execute(<<-SQL, @author_id)
          SELECT author_id FROM questions
          WHERE author_id = ?
        SQL
    end

    def authored_questions
      Replies.find_by_question_id(@id)
    end

    def create
      raise "#{self} is already in the db" if @id

      QuestionsDB.instance.execute(<<-SQL, @title, @author_id, @body)
        INSERT INTO
          questions (title, author_id, body)
        VALUES
          (?, ?, ?)
      SQL

      @id = QuestionsDB.instance.last_insert_row_id
    end
end
