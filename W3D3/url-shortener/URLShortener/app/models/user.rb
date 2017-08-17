class User < ApplicationRecord
  validates :email, uniqueness: true, presence: true

  has_many :submitted_urls,
    primary_key: :id,
    foreign_key: :submitter_id,
    class_name: "ShortenedUrl"

  has_many :visits,
    primary_key: :id,
    foreign_key: :visitor_id,
    class_name: 'Visit'

  has_many :visited_sites,
    through: :visits,
    source: :visited_url
end
