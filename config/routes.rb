Shortener::Application.routes.draw do

  resources :links

  root 'index#index'

  match ':urlhash' => 'index#reroute', via: [:get, :post]
  match 'show/:urlhash' => 'index#show', via: [:get, :post]

end
