require_relative 'QuestionsDB'

class Question_Likes
  attr_accessor :id, :question_id, :user_id
  def self.find_by_user_id(user_id)
    user = QuestionsDB.instance.execute(<<-SQL, user_id)
        SELECT * FROM question_follows WHERE user_id = ?
    SQL
    return nil if user.empty?

    self.new(user.first)
  end

  def self.find_by_question_id(question_id)
    user = QuestionsDB.instance.execute(<<-SQL, question_id)
        SELECT * FROM question_follows WHERE question_id = ?
    SQL
    return nil if user.empty?

    self.new(user.first)
  end

  def self.all
    data = QuestionsDB.instance.execute("SELECT * FROM question_likes")
    data.map { |dat_piece| self.new(dat_piece) }
  end

  def initialize(options)
    @id = options['id']
    @question_id = options['question_id']
    @user_id = options['user_id']
  end

  def create
    raise "#{self} is already in the db" if @id

    QuestionsDB.instance.execute(<<-SQL, @question_id, @user_id)
      INSERT INTO
        question_likes (question_id, user_id)
      VALUES
        (?, ?)
    SQL

    @id = QuestionsDB.instance.last_insert_row_id
  end
end
