class AddReferenceToArtworks < ActiveRecord::Migration[5.1]
  def change
		remove_column :artworks, :user_id
  end
end
