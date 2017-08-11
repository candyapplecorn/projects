def smart_tar_sum(arr, tar)
  h = {}

  arr.each_with_index do |e, i|
    diff = tar - e

    return true if h[e]

    h[diff] = i
  end

  false
end

def bad_two_sum?(arr, tar)

  arr.each_with_index do |e, i|
    (i...arr.length).each do |i2|
      e2 = arr[i2]

      return true if e2 + e == tar
    end
  end

  false
end

bad_two_sum?([1, 2, 1, -2])

def okay_two_sum?(arr, target = 2)
  a = arr.sort
  l = 0
  r = a.length-1
  if a[l] + a[r] < target
    return false
  end

  loop do
    return true if a[l]+a[r] == target
    sum = a[l]+a[r]
    l+=1 if sum < target
    r-=1 if sum > target
    return false if l >= r
  end
end
okay_two_sum? [-1, -2, 4, 3]
