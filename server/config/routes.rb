Rails.application.routes.draw do
  get '/' => 'home#index'

  post '/login' => 'user#login'
  get '/user/me' => 'user#view_current'

  get '/pictures' => 'picture#index'
  get '/pictures/recent' => 'picture#recent'
  get '/pictures/:id_or_slug' => 'picture#view'
  post '/pictures' => 'picture#upload'

  get '/galleries' => 'gallery#list'
  post '/gallery' => 'gallery#create'
  get '/gallery/all' => 'picture#index'
  get '/gallery/recent' => 'picture#recent'
  get '/gallery/:id_or_slug' => 'gallery#view'
  get '/gallery/:id_or_slug/pictures' => 'picture#view_gallery'
  patch '/gallery/:id_or_slug' => 'gallery#update'
  delete '/gallery/:id_or_slug' => 'gallery#destroy'
end
