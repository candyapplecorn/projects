json.array! @guests do |guest|
  next unless guest.age.between?(40, 50)
  json.partial! '/api/guests/guest', guest: guest
end
