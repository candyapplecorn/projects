require_relative 'QuestionsDB'
require 'byebug'

class Replies
    attr_accessor :id, :question_id, :reply_id, :user_id, :body
    def self.find_by_question_id(question_id)
      user = QuestionsDB.instance.execute(<<-SQL, question_id)
          SELECT * FROM replies WHERE question_id = ?
      SQL

      return nil if user.empty?
      self.new(user.first)
    end

    def self.find_by_user_id(user_id)
      reply = QuestionsDB.instance.execute(<<-SQL, user_id)
          SELECT * FROM replies WHERE user_id = ?
      SQL

      return nil if reply.empty?
      self.new(reply.first)
    end

    def self.find_by_reply_id(reply_id)
      user = QuestionsDB.instance.execute(<<-SQL, reply_id)
          SELECT * FROM replies WHERE reply_id = ?
      SQL

      return nil if user.empty?
      self.new(user.first)
    end

    def self.all
      data = QuestionsDB.instance.execute("SELECT * FROM replies")
      data.map { |dat_piece| self.new(dat_piece) }
    end

    def initialize(options)
      @id = options['id']
      @question_id = options['question_id']
      @reply_id = options['reply_id']
      @user_id = options['user_id']
      @body = options['body']
    end

    def author
      debugger
      user = QuestionsDB.instance.execute(<<-SQL, @user_id)
        SELECT user_id FROM replies WHERE user_id = ?
      SQL

      return nil if user.empty?
      self.new(user.first)
    end

    # def parent_reply
    #   replies = QuestionsDB.instance.execute(<<-SQL, @reply_id )
    #     SELECT * FROM replies WHERE id = ?
    #   SQL
    #
    #   return nil if replies.empty?
    #   self.new(replies.first)
    # end

    # def child_reply
    #   replies = QuestionsDB.instance.execute(<<-SQL, @reply_id )
    #     SELECT * FROM replies WHERE reply_id = ?
    #   SQL
    #
    #   return nil if replies.empty?
    #   self.new(replies.first)
    # end



    def question
      Question.find_by_id(@question_id)
    end

    def create
      raise "#{self} already exists" if @id

      QuestionsDB.instance.execute(<<-SQL, @question_id, @reply_id, @user_id, @body)
        INSERT INTO
          replies (question_id, reply_id, user_id, body)
        VALUES
          (?, ?, ?, ?)
      SQL

      @id = QuestionsDB.instance.last_insert_row_id
    end

end
