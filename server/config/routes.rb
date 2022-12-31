Rails.application.routes.draw do
  get '/' => 'home#index'

  post '/login' => 'users#login'
  get '/user/me' => 'users#view_current'

  get '/posts' => 'posts#index'
  get '/posts/recent' => 'posts#recent'
  get '/posts/:id_or_slug' => 'posts#view'
  patch '/posts/:id_or_slug' => 'posts#update'
  get '/posts/:id_or_slug/next' => 'posts#next'
  get '/posts/:id_or_slug/prev' => 'posts#prev'
  post '/posts' => 'posts#upload'

  get '/galleries' => 'galleries#list'
  post '/gallery' => 'galleries#create'
  get '/gallery/:id_or_slug' => 'galleries#view'
  get '/gallery/:id_or_slug/posts' => 'posts#view_gallery'
  patch '/gallery/:id_or_slug' => 'galleries#update'
  delete '/gallery/:id_or_slug' => 'galleries#destroy'

  get '/tags' => 'tags#list'
  post '/tag' => 'tags#create'
  get '/tag/:id_or_slug' => 'tags#view'
  get '/tag/:id_or_slug/posts' => 'posts#view_tagged'
  patch '/tag/:id_or_slug' => 'tags#update'
  delete '/tag/:id_or_slug' => 'tags#destroy'
end
