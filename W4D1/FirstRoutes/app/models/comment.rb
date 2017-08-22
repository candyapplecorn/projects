class Comment < ApplicationRecord
	validates :body, :author_id, :artwork_id, presence: true

	belongs_to :author,
		primary_key: :id,
		foreign_key: :author_id,
		class_name: 'User',
		dependent: :destroy

	belongs_to :artwork,
		primary_key: :id,
		foreign_key: :artwork_id,
		class_name: 'Artwork',
		dependent: :destroy
end
