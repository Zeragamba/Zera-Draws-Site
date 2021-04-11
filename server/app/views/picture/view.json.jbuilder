json.id @picture.id
json.date @picture.date
json.order @picture.order
json.title @picture.title
json.src "#{@api_url}/picture/#{@picture.id}"
json.tags @picture.tags.map(&:name)
