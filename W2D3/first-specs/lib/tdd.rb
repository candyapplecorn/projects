def stock_picker(prices)
  best = []
  diff = 0

  prices.each_index do |i|
    ((i + 1)...(prices.length)).each do |j|
      if prices[j] - prices[i] > diff
        best = [i, j]
        diff =  prices[j] - prices[i]
      end
    end
  end
  best
end


def my_transpose(list)
  transposed = []
  list.each_index do |row|
    new_row = []
    list[row].each_index do |col|
      new_row << list[col][row]
    end
    transposed << new_row
  end
  transposed
end

def my_uniq(list)
  res = []

  list.each {|i| res << i if !res.include? i}

  res
end

class Array
  def two_sum
    z_s = []

    self.each_with_index do |e, i|
      self.each_with_index do |e2, i2|
        z_s << [i, i2] if e + e2 == 0 && i2 > i
      end
    end

    z_s
  end
end
