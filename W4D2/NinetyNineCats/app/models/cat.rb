class Cat < ApplicationRecord
  COLORS = %w(white black brown red orange calico gray)
  attr_reader :COLORS
  validates :name, :birth_date, :sex, :color, :description, presence: true
  validates :color, inclusion: { in: COLORS }
  validates :sex, inclusion: { in: ['M', 'F']}

  def age
    days_alive = Date.today - birth_date

    years = (days_alive.to_i/365)


    leftover_days = days_alive % 365
    # fail
    if leftover_days < 365 / 3
      "#{years} years old"
    elsif leftover_days < 365 / 2
      "over #{years} years old"
    else
      "almost #{years + 1} years old"
    end
  end
end
