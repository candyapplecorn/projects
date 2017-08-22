# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Artwork.destroy_all
User.destroy_all
ArtworkShare.destroy_all

# make 5 users
5.times do
		User.create!(username:  Faker::Name.unique.name)
end

# make 10 artworks 
10.times do
		Artwork.create!(title: [Faker::Ancient.god, 
												 	 Faker::Ancient.primordial, 
													 Faker::Ancient.titan, 
													 Faker::Ancient.hero].sample,
								   image_url: Faker::Internet.url,
							 		 artist_id: (User.all.map(&:id).sample))
end

# share about half the art
(User.all.map(&:id)).product(Artwork.all.map(&:id)).each do |ua|
	if rand(2) > 0
		viewer_id = ua.first
		artwork_id = ua.last

		ArtworkShare.create(viewer_id: viewer_id, artwork_id: artwork_id)
	end
end


