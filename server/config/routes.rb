Rails.application.routes.draw do
  get '/' => 'home#index'

  post '/login' => 'users#login'
  get '/user/me' => 'users#view_current'

  get '/posts' => 'posts#index'
  get '/posts/recent' => 'posts#recent'
  get '/posts/:id_or_slug' => 'posts#view'
  post '/posts' => 'posts#upload'

  get '/galleries' => 'galleries#list'
  post '/gallery' => 'galleries#create'
  get '/gallery/:id_or_slug' => 'galleries#view'
  get '/gallery/:id_or_slug/posts' => 'posts#view_gallery'
  patch '/gallery/:id_or_slug' => 'galleries#update'
  delete '/gallery/:id_or_slug' => 'galleries#destroy'
end
