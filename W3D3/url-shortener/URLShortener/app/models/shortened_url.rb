class ShortenedUrl < ApplicationRecord
  # validations
  validates :short_url, uniqueness: true, presence: true
  validates :long_url, presence: true
  # associations
  belongs_to :submitter,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: 'User'

  has_many :visits,
    primary_key: :id,
    foreign_key: :visited_url_id,
    class_name: 'Visit'

  has_many :unique_visitors,
    ->{ distinct },
    through: :visits,
    source: :visitor

  has_many :visitors,
    through: :visits,
    source: :visitor

  def self.from_long_url(author_id, long_url)
    sixteen = SecureRandom.urlsafe_base64(12)

    while ShortenedUrl.exists?(:short_url => sixteen)
      sixteen = SecureRandom.urlsafe_base64(12)
    end

    create!(author_id: author_id, long_url: long_url, short_url: sixteen)
  end

  def num_clicks
    #Visit.all.select{|v| v.visited_url_id == @id}.count
    visitors.count
  end

  def num_uniques
    unique_visitors.distinct(:visitor_id).count
    visits.select(:visitor_id).distinct.count
  end

  def recent_uniques
    visits.select(:visitor_id).distinct.
           where(["created_at > ?", 10.minutes.ago]).count
  end
end
