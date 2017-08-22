Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
	#resources :users

#	get '/users/', 	to: 'users#index', as: 'users'
#	post '/users/', to: 'users#create'
#	get '/users/new/', to: 'users#new', as: 'new_user'
#	get '/users/:id/edit', to: 'users#edit', as: 'edit_user'
#	get 'users/:id', to: 'users#show', as: 'user'
#	patch '/users/:id', to: 'users#update'
#	put '/users/:id', to: 'users#update'
#	delete '/users/:id', to: 'users#destroy'
	resources :users, only: [:update, :show, :index, :destroy, :create]

	resources :artworks, only: [:update, :show, :index, :destroy, :create]

	resources :artwork_shares, only: [:create, :destroy]
	#post 		'/artwork_shares', 			to: 'artworks#create'
	#delete  '/artwork_shares/:id', 	to: 'artworks#destroy'

	get '/users/:user_id/artworks', to: 'artworks#index'#, as: 'artworks'

	resources :comments
end
