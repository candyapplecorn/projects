class RemoveForeignKeyFromArtworkShares < ActiveRecord::Migration[5.1]
  def change
		remove_foreign_key :artwork_shares, :artworks
		remove_foreign_key :artwork_shares, :viewers
  end
end
