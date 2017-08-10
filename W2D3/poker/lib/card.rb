
class Card
  FACES = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"]
  SUITS = ["spades",  "clubs", "diamonds", "hearts"]

  attr_reader :face, :suit
  def initialize(face, suit)
    @face = face
    @suit = suit
  end

  def display
    {face: FACES[@face], suit: SUITS[@suit]}
  end
end
