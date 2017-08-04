require_relative 'tic_tac_toe'
require 'byebug'

class TicTacToeNode
  attr_accessor :board, :next_mover_mark, :prev_move_pos

  def initialize(board, next_mover_mark, prev_move_pos = nil)
    @board = board
    @next_mover_mark = next_mover_mark
    @prev_move_pos = prev_move_pos
  end

  def losing_node?(evaluator)
    return true  if @board.over? && @board.winner != evaluator
    return false if @board.over? && (@board.winner == evaluator ||
                                    @board.winner.nil?)

    ch = children

    return true if ch.all? { |child| child.losing_node?(evaluator) } &&
                      @next_mover_mark == evaluator
    return true if ch.any? { |child| child.losing_node?(evaluator) } &&
                      @next_mover_mark != evaluator

    false
  end

  def other_p(sym)
    sym == :x ? :o : :x
  end

  def winning_node?(evaluator)
    return true if @board.winner == evaluator
    #return false if @board.winner.nil? || @board.winner == other_p(evaluator)

    ch = children

    ch.any? { |c| c.winning_node?(evaluator) }
  end

  # This method generates an array of all moves that can be made after
  # the current move.
  def children
    next_turns = []

    @board.rows.each_with_index do |row, i|
      row.each_index do |i2|
        if @board.empty? [i, i2]
          dupe = @board.dup
          dupe[[i, i2]] = @next_mover_mark
          next_turns << TicTacToeNode.new(dupe,
                                          other_p(@next_mover_mark),
                                          [i, i2])
        end
      end
    end

    next_turns
  end
end
