class MinMaxStackQueue
  attr_accessor :input
  def initialize
    @input = []
    @output = []
  end
  def enqueue(val)
    if @input.empty?
      @input.push(MinMaxTracker.new(val))
    else
      @input.push(MinMaxTracker.new(val,
                    @input.last.max,
                    @input.last.min))
    end
  end

  def dequeue
    b = MinMaxStackQueue.new

    until @input.empty?
      b.enqueue(@input.pop.value)
    end

    ret = b.input.pop

    c = MinMaxStackQueue.new

    until b.input.empty?
      c.enqueue(b.input.pop.value)
    end

    @input = c.input

    return ret
  end
end


class MinMaxTracker
  attr_reader :value, :max, :min
  def initialize(v, max = v, min = v)
    @value = v
    @max = [v, max].max
    @min = [v, min].min
  end
end



def windowed_max_range(list, w_size)
  max_diff = list.min

  list.each_index do |i|
    window = list.slice(i, w_size)

    diff = window.max - window.min

    max_diff = diff if diff > max_diff
  end

  max_diff
end

windowed_max_range([1, 0, 2, 5, 4, 8], 2) == 4 # 4, 8
windowed_max_range([1, 0, 2, 5, 4, 8], 3) == 5 # 0, 2, 5
windowed_max_range([1, 0, 2, 5, 4, 8], 4) == 6 # 2, 5, 4, 8
windowed_max_range([1, 3, 2, 5, 4, 8], 5) == 6 # 3, 2, 5, 4, 8
