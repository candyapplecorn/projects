class CreateArtworkShares < ActiveRecord::Migration[5.1]
  def change
    create_table :artwork_shares do |t|
      t.integer :viewer_id
      t.integer :artwork_id

      t.timestamps
    end

		add_index :artwork_shares, [:artwork_id, :viewer_id], unique: true
		add_foreign_key :artwork_shares, :artworks, column: :artwork_id, primary_key: :id
		add_foreign_key :artwork_shares, :users, column: :viewer_id, primary_key: :id
  end
end
