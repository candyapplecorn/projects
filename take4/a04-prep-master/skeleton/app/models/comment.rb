class Comment < ApplicationRecord
  validates :body, :user, :link, presence: true
  
  belongs_to :user
  belongs_to :link
end
