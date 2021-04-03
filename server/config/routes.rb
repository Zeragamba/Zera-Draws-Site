Rails.application.routes.draw do
  get '/' => 'home#index'
  get '/pictures' => 'picture#index'
  get '/picture/:id' => 'picture#view'
end
