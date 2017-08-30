class Post < ApplicationRecord
  validates :title, :author, presence: true

  belongs_to :author,
    foreign_key: :user_id,
    class_name: 'User'

  has_many :postsubs,
    primary_key: :id,
    foreign_key: :post_id,
    class_name: 'PostSub',
    inverse_of: :post

  has_many :subs,
    through: :postsubs,
    source: :sub

  has_many :comments
end
