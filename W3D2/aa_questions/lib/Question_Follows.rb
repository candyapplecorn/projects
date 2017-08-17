require_relative 'QuestionsDB'

class Question_Follows
  attr_accessor :id, :question_id, :author_id

  def self.find_by_author_id(author_id)
    user = QuestionsDB.instance.execute(<<-SQL, author_id)
        SELECT * FROM question_follows WHERE author_id = ?
    SQL
    return nil if user.empty?

    self.new(user.first)
  end

  def self.all
    data = QuestionsDB.instance.execute("SELECT * FROM question_follows")
    data.map { |dat_piece| self.new(dat_piece) }
  end

  def initialize(options)
    @id = options['id']
    @question_id = options['question_id']
    @author_id = options['author_id']
  end

  def create
    raise "#{self} is already in the db" if @id

    QuestionsDB.instance.execute(<<-SQL, @question_id, @author_id)
      INSERT INTO
        question_follows (question_id, author_id)
      VALUES
        (?, ?)
    SQL

    @id = QuestionsDB.instance.last_insert_row_id
  end
end
