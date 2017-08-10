require 'rspec'
require 'deck'

describe "deck" do
  let(:deck){ Deck.new }

  describe "#initialize" do
    it "has 52 cards" do
      expect(deck.count).to eq(52)
    end

    it "has four suits for each face" do
      0.upto(12).each do |ctr|
        expect(deck.deck.count {|c| c.face == ctr}).to eq(4)
      end
    end

    it "has every card" do
      0.upto(51).each do |i|
        face = i / 4
        expect(deck.deck[i].face).to eq(face)
      end
    end
  end
  
end
