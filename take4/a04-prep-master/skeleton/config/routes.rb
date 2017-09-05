Rails.application.routes.draw do
  resource :session
  resources :comments, only: [:destroy]

  resources :links do
    resources :comments, only: [:create]
  end


  resources :users, only: [:create, :new]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
