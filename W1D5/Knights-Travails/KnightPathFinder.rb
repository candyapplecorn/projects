require_relative 'PolyTreeNode'
require 'byebug'

class KnightPathFinder
  def initialize(start_pos)
    @visited_positions = [start_pos]
    @start_pos = start_pos
    @move_tree = build_move_tree
  end

  def build_move_tree
    root = PolyTreeNode.new(@start_pos)
    queue = [root]
    #debugger

    until queue.empty?
      curr = queue.shift # array: [0, 0]
      #debugger if curr.value == [4, 2]
      moves = valid_moves(curr.value)
      moves.reject! {|m| @visited_positions.include? m }
      @visited_positions += moves

      # debugger if moves.nil?
      next if moves.nil?

      moves.each do |m|
        node = PolyTreeNode.new(m)
        curr.add_child(node)
        queue << node
      end
    end

    #debugger
    @visited_positions = []
    root
  end

  def trace_path_back(start)
    positions = []
    val = start.value

    until val.nil?
      positions << val
      start = start.parent

      if start
        val = start.value
      else
        val = nil
      end
    end

    positions
  end

  def find_path(end_pos)
    found = build_move_tree.bfs(end_pos)
    trace_path_back(found)
  end

  def new_move_positions(pos)
    moves = valid_moves(pos).reject { |rc| @visited_positions.include?(rc) }
    @visited_positions += moves
    moves
  end

  def valid_moves(pos)
    offsets = [-2, +2].product [-1, +1]
    offsets += offsets.map(&:reverse)
    moves = offsets.map { |rc| [rc[0] + pos[0], rc[-1] + pos[-1]] }

    moves.select do |rc|
      rc.all? { |n| n.between?(0, 7) }
    end
  end
end

if __FILE__ == $PROGRAM_NAME
  kpf = KnightPathFinder.new([0, 0])
  p kpf.find_path([7, 6]) # => [[0, 0], [1, 2], [2, 4], [3, 6], [5, 5], [7, 6]]
  p kpf.find_path([6, 2]) # => [[0, 0], [1, 2], [2, 0], [4, 1], [6, 2]]
end
