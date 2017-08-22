class Artwork < ApplicationRecord
	validates :artist_id, :image_url, :title, presence: true
	validates :title, uniqueness: { scope: :artist_id, message: "An artist can only submit unique titles" } 

  belongs_to :artist,
		primary_key: :id,
		foreign_key: :artist_id,
		class_name: 'User'

	has_many :shares,
		primary_key: :id,
		foreign_key: :artwork_id,
		class_name: 'ArtworkShare'

	has_many :shared_viewers,
		through: :shares,
		source: :viewer
end
