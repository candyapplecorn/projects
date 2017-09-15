json.extract! @party, :name, :location

json.guests @party.guests do |guest|
  json.extract! guest, :id, :name

  json.gifts guest.gifts do |gift|
    json.extract! gift, :title, :description, :id
  end
end
