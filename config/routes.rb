Shortener::Application.routes.draw do

  resources :links

  root 'home#index'

  match ':urlhash' => 'home#reroute', via: [:get, :post]
  match 'show/:urlhash' => 'home#show', via: [:get, :post]

end
