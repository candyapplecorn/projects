class CatRentalRequest < ApplicationRecord
  validates :cat_id, :start_date, :end_date, :status, presence: true
  validates :status, inclusion: { in: %w(PENDING APPROVED DENIED), message: "invalid status"}
  validates :overlapping_approved_requests

  belongs_to :cat,
  foreign_key: :cat_id,
  primary_key: :id,
  class_name: 'Cat',
  dependent: :destroy

  private
  def overlapping_requests
      CatRentalRequest.where.not("(start_date > :end) OR (end_date < :start)", { start: start_date, end: end_date })
        .where("id != :cat_id", cat_id: id)
  end

  def overlapping_approved_requests
    #overlapping_requests.where("status = 'APPROVED'")
    if overlapping_requests.where("status = 'APPROVED'").count != 0
      errors[:overlap] << "There is an overlapping rental request"
    end
  end
end
