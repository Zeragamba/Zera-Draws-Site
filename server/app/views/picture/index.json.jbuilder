json.size @pictures.count
json.pictures @pictures.all do |picture|
  json.partial! 'picture', locals: { picture: picture }
end
