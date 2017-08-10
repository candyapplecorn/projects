class Deck
  attr_reader :deck

  def initialize
    @deck = Array.new(52) do |i|
      suit = i % 4
      face = i / 4
      Card.new(face, suit)
    end
  end

  def count
    @deck.count
  end
end
