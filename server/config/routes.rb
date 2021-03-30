Rails.application.routes.draw do
  get 'pictures' => 'picture#index'
  get 'picture/:id' => 'picture#view'
end
