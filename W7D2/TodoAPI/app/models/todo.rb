class Todo < ApplicationRecord
		validates :title, :body, presence: true
		validates :title, length: { minimum: 3 }
		validates :done, inclusion: { in: [true, false] }
end
