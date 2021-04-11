json.size @pictures.count
json.pictures @pictures.all do |picture|
  json.id picture.id
  json.data picture.date
  json.order picture.order
  json.title picture.title
  json.src "#{@api_url}/picture/#{picture.id}"
  json.tags picture.tags.map(&:name)
end
