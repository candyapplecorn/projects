class RemoveForeignKeysFromArtworkShares < ActiveRecord::Migration[5.1]
  def change
		remove_foreign_key :artwork_shares, :users
		remove_foreign_key :artwork_shares, :artworks
  end
end
