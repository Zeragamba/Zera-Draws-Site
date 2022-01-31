Rails.application.routes.draw do
  get '/' => 'home#index'

  post '/login' => 'user#login'
  get '/user/me' => 'user#view_current'

  get '/pictures' => 'picture#index'
  get '/pictures/recent' => 'picture#recent'
  get '/pictures/:id' => 'picture#view'
end
