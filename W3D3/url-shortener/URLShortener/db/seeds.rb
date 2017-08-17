# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
  User.destroy_all
  user1 = User.create(email: 'dogs@dogs.dog')
  user2 = User.create(email: 'austinpowers@gold.member')
  user3 = User.create(email: 'name@internet.website')

  ShortenedUrl.destroy_all
  url1 = ShortenedUrl.from_long_url(user1.id, "http://www.niceme.me")
  url2 = ShortenedUrl.from_long_url(user2.id, "http://www.nicememe.website")
  url3 = ShortenedUrl.from_long_url(user2.id, "http://www.poop.bike")
end
