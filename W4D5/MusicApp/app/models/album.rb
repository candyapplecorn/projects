class Album < ApplicationRecord
  validates :title, :band_id, presence: true

  belongs_to :band,
    primary_key: :id,
    foreign_key: :band_id,
    class_name: 'Band'

  def live?
    !!live
  end

  def studio?
    !live
  end
end
