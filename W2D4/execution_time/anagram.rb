require 'byebug'

def anagram(str1, str2)
  str1.chars.permutation.to_a.map(&:join).include?(str2)
end

def second_anagram?(str1, str2)
  a = str1.dup.chars
  b = str2.dup.chars

  str1.each_char.with_index do |l, i|
    #debugger
    if b.index(l)
      a.delete_at(a.index(l))
      b.delete_at(b.index(l))
    end
  end

  return b.empty? && a.empty?
end

def third_anagram?(str1, str2)
  str1.chars.sort == str2.chars.sort
end

def fourth_anagram(str1, str2)
  hash1 = Hash.new(0)
  hash2 = Hash.new(0)

  str1.each_char {|char| hash1[char]+=1}
  str2.each_char {|char| hash2[char]+=1}

  hash1.each do |k, v|
    return false unless hash2[k]==v
  end

  true
end

fourth_anagram("Joseph", "phesoJ")
