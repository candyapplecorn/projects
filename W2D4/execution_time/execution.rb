def contig_sum_n(list)
  return list.max if list.all?{|n| n < 0}
  max, curr = 0, 0

  list.each do |e|
    if curr + e < 0
      curr = 0
      next
    end

    curr += e

    max = [max, curr].max
  end

  max
end


def my_min(array)
  array.each do |el|
    min = true
    arr.each do |e|
      min = false if e < el
    end
    return el if min
  end
end

def my_min_linear(array)
min = array.first
array[1..-1].each do |e|
  if min > e
    min = e
  end
end
return min
end

def contig_sum(list)
  sequences = []

  list.each_index do |i|
    (i+1...list.length).each do |j|
      sequences << list[i..j]
    end
  end
  sequences.map do |sequence|
    sequence.inject(:+)
  end.max
end
