class ArtworkShare < ApplicationRecord
	validates :viewer_id, :artwork_id, presence: true
	validates :artwork_id, uniqueness: { scope: :viewer_id, message: "An artwork can't be shared with the same viewer twice!" }
	
	belongs_to :viewer,
		primary_key: :id,
		foreign_key: :viewer_id,
		class_name: 'User'

	belongs_to :artwork, 
		primary_key: :id,
		foreign_key: :artwork_id,
		class_name: 'Artwork'
end
