# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Cat.destroy_all
10.times do
  Cat.create!(color: Cat::COLORS.sample,
          name: Faker::Cat.name,
          description: Faker::Cat.breed,
          sex: ['M', 'F'].sample,
          birth_date: Faker::Date.between(10.years.ago, Date.today),)
end

CatRentalRequest.create!(start_date: 5.days.ago, end_date: 2.days.ago, cat_id: Cat.first.id, status: 'APPROVED')
CatRentalRequest.create!(start_date: 4.days.ago, end_date: 1.days.ago, cat_id: Cat.first.id, status: 'APPROVED')
CatRentalRequest.create!(start_date: 10.days.ago, end_date: 8.days.ago, cat_id: Cat.first.id, status: 'APPROVED')
