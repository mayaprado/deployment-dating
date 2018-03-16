Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :photos
  get 'isLoggedIn', :to => 'users#is_logged_in'
  post 'users/login', :to => 'users#login'
  get 'users/:id/photos', :to => 'users#photos'
  resources :users
  resources :conversations
  resources :messages
end
