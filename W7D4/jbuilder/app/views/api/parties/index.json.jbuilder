json.array! @parties do |party|
  json.extract! party, :name, :location

  json.guests party.guests do |guest|
    json.name guest.name
    json.id guest.id
  end
end
