Rails.application.routes.draw do
  get '/' => 'home#index'
  get '/status' => 'home#index'

  post '/login' => 'auth#login_password'
  post '/login/password' => 'auth#login_password'
  get '/login/passkey' => 'auth#login_passkey_challenge'
  post '/login/passkey' => 'auth#login_passkey_validate'

  post '/logout' => 'auth#logout'

  get '/user/me' => 'users#view_current'
  get '/user/me/passkey' => 'auth#list_passkeys'
  get '/user/me/passkey/new' => 'auth#register_passkey_challenge'
  post '/user/me/passkey' => 'auth#register_passkey_validate'
  put '/user/me/passkey/:passkey_id' => 'auth#update_passkey'
  delete '/user/me/passkey/:passkey_id' => 'auth#remove_passkey'

  get '/meta/:group' => 'meta#list'
  put '/meta/:group' => 'meta#save'

  get '/metrics/views' => 'metrics#export_views'

  get '/posts' => 'posts#index'
  post '/posts' => 'posts#upload'
  get '/posts/recent' => 'posts#recent'
  get '/post/latest' => 'posts#latest'
  get '/post/first' => 'posts#first'
  get '/post/:post_id' => 'posts#view'
  get '/post/:post_id/views' => 'views#get_views'
  post '/post/:post_id/views' => 'views#add_view'
  patch '/post/:post_id' => 'posts#update'
  delete '/post/:post_id' => 'posts#destroy'

  get '/galleries' => 'galleries#list'
  post '/gallery' => 'galleries#create'
  get '/gallery/:gallery_id' => 'galleries#view'
  get '/gallery/:gallery_id/posts' => 'posts#view_gallery'
  patch '/gallery/:gallery_id' => 'galleries#update'
  delete '/gallery/:gallery_id' => 'galleries#destroy'

  get '/tags' => 'tags#list'
  post '/tags' => 'tags#create'
  get '/tags/empty' => 'tags#list_empty'
  delete '/tags/empty' => 'tags#destroy_empty'
  get '/tag/:tag_id' => 'tags#view'
  get '/tag/:tag_id/posts' => 'posts#view_tagged'
  post '/tag/:tag_id/merge_into/:dest_id' => 'tags#merge'
  patch '/tag/:tag_id' => 'tags#update'
  delete '/tag/:tag_id' => 'tags#destroy'

  get '/post/:post_id/next' => 'posts#next'
  get '/post/:post_id/prev' => 'posts#prev'
  get '/gallery/:gallery_id/:post_id/next' => 'posts#next'
  get '/gallery/:gallery_id/:post_id/prev' => 'posts#prev'
  get '/tag/:tag_id/:post_id/next' => 'posts#next'
  get '/tag/:tag_id/:post_id/prev' => 'posts#prev'
end
