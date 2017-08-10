class TowersOfHanoi
  attr_accessor :towers

  def initialize
    @towers = [[3, 2, 1], [], []]
  end

  def move(start, dest)
    return false unless [start, dest].all?{|n| n.between?(0, 2)}

    dest_plate = towers[dest].last
    start_plate = towers[start].last

    return false if start_plate.nil?

    unless dest_plate.nil?
      if towers[dest].last < towers[start].last
        return false
      end
    end


    @towers[dest].push(@towers[start].pop)

    true
  end

  def won?
    @towers[0].empty? &&
    @towers[1].empty? ||
    @towers[2].empty?
  end
end


# 321 _ _
# 32  1 _
# 0, 1

# 32  1  __
