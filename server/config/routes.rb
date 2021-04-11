Rails.application.routes.draw do
  get '/' => 'home#index'
  get '/pictures' => 'picture#index'
  get '/pictures/recent' => 'picture#recent'
  get '/pictures/:id' => 'picture#view'
end
