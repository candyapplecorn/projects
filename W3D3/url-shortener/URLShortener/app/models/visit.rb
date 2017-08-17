class Visit < ApplicationRecord
  belongs_to :visitor,
    primary_key: :id,
    foreign_key: :visitor_id,
    class_name: 'User'

  belongs_to :visited_url,
    primary_key: :id,
    foreign_key: :visited_url_id,
    class_name: 'ShortenedUrl'

  validates :visitor_id, :visited_url_id, presence: true

  def self.record_visit!(user, shortened_url)
    Visit.create!(visitor_id: user.id, visited_url_id: shortened_url.id)
  end
end
