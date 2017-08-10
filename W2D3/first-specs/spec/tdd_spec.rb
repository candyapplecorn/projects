require 'rspec'
require 'tdd'


describe "stock_picker" do
  let(:prices) { [100, 50, 25, 200, 60, 10]}

  it "Does not return a buy date before a sell date" do
    best = stock_picker(prices)
    expect(best.first).to be < (best.last)
  end

  it "Returns the most profitable pair" do
    expect(stock_picker(prices)).to eq([2, 3])
  end
end

describe "my_transpose" do
  let(:list) {[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ]}

  it "Contains the same elements as the original array" do
    expect(my_transpose(list).flatten.sort).to eq(list.flatten.sort)
  end

  it "Should not modify the original" do
    dupe = list.dup
    my_transpose(list)
    expect(list).to eq(dupe)
  end

  it "Transposes the array" do
    expect(my_transpose(list)).to eq([
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ])
  end
end


describe "two_sum" do
  let("list") {[-1, 0, 2, -2, 1]}

  it "Matches real pairs" do
    expect(list.two_sum).to_not include([1,1])
  end

  it "Does not return duplicate pairs" do
    expect(list.two_sum.none? {|l| l.first > l.last }).to be true
  end

  it "Returns the true zero pairs" do
    expect(list.two_sum).to eq([[0, 4], [2, 3]])
  end
end



# 1. Does not mutate the original array
# 2. Doesn't return same array
# 3. Match its return value against built-in dups
# 4. Order matters

describe "my_uniq" do
  let("list") { (1..5).to_a + [5, 4, 6] }

  it "Does not return the same array" do
    expect(my_uniq(list)).not_to be(list)
  end

  it "Does not mutate the original array" do
    dupe = list.dup
    my_uniq(list)
    expect(list).to eq(dupe)
  end

  it "Its return value matches the built-in Array#uniq" do
    expect(my_uniq(list)).to eq(list.uniq)
  end

  it "It returns in the order of the original array" do
    expect do
      a = list.uniq
      b = my_uniq(list)
      a.each_index do |i|
        raise "mismatch" unless a[i] == b[i]
      end
    end.not_to raise_error

  end

end
