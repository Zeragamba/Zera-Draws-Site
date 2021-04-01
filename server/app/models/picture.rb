class Picture < ApplicationRecord
  def as_json(options)
    {
      "id" => self.id,
      "data" => self.date,
      "order" => self.order,
      "title" => self.title,
      "src" => "/api/picture/#{self.id}",
    }
  end
end
