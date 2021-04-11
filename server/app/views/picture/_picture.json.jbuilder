json.id picture.id
json.date picture.date
json.order picture.order
json.title picture.title
json.src url_for(controller: :picture, action: :view, id: picture.id, only_path: true)
json.tags picture.tags.map(&:name)
