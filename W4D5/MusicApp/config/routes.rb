Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resource :session, only: [:new, :create, :destroy]

  resources :users

  resources :bands do
    resources :albums, only: [:new]
  end

  resources :albums, except: [:index, :new]

  root to: 'users#index'
end
