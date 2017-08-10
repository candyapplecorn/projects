require 'rspec'
require 'card'

describe "card" do
  let("ace") { Card.new(0, 0) }
  describe "#initialize" do
    it "Initialized to a Spade card" do
      expect(ace.suit).to eq(0)
    end
    it "Initialized to a face value" do
      expect(ace.face).to eq(0)
    end
  end

  describe "#display" do
    it "Returns a hash with its display values" do
      expect(ace.display).to eq({face: "ace", suit: "spades"})
    end
  end
end
