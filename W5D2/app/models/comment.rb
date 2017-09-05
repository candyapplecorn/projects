class Comment < ApplicationRecord
  validates :content, :author, :post, presence: true

  belongs_to :author,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: 'User'

  belongs_to :post,
    foreign_key: :post_id,
    primary_key: :id,
    class_name: 'Post',
    dependent: :destroy

  belongs_to :parent_comment,
    primary_key: :id,
    foreign_key: :parent_id,
    class_name: 'Comment',
    optional: true

  has_many :child_comments,
    primary_key: :id,
    foreign_key: :parent_id,
    class_name: 'Comment'
end
