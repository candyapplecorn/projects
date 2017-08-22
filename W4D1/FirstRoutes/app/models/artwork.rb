class Artwork < ApplicationRecord
	validates :artist_id, :image_url, :title, presence: true

  belongs_to :artist,
		primary_key: :id,
		foreign_key: :artist_id,
		class_name: 'User'
end
