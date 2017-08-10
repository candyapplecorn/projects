require 'rspec'
require 'towers_of_hanoi'

describe "Towers of Hanoi" do
  let(:towers){ TowersOfHanoi.new }

  context "#initialize" do
    it "Starts with an array of three arrays" do
      expect(towers.towers.count).to eq(3)
    end

    it "Has three discs in its first sub-array" do
      expect(towers.towers.first).to eq([3, 2, 1])
    end
  end

  describe "#move" do
    it "Moves discs" do
      towers.move(0, 1)
      expect(towers.towers[1]).to include(1)
    end

    it "Returns false if the starting tower is empty" do
      expect(towers.move(2, 1)).to be false
    end

    it "Forbids moving a larger disc on top of a smaller one" do
      towers.move(0, 1)
      expect(towers.move(0, 1)).to be false
    end

    it "Accepts only valid column numbers" do
      expect(towers.move(4, 3)).to be false
    end

  end

  describe "#won?" do
    it "Ensures all discs are on a stack other than the beginning stack" do
      towers.towers.reverse!
      expect(towers.won?).to be true
    end

    it "Two stacks are empty, including the intial stack" do
      towers.towers.reverse!

      nonempty = towers.towers.inject(0) do |a, sl|
        a += 1 if sl.count > 0
        a
      end

      expect(towers.towers[0].empty? && nonempty == 1).to be true
    end
  end
end

# Test to see if all the discs become on another plate
# Test to see if a bigger disc may be moved on to a smaller one
# Test to see if the initial and one other sub-list are empty
# Test ot see if the total number of discs is equal to the starting number of discs
