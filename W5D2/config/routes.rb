Rails.application.routes.draw do
  root to: "subs#index"

  resources :posts, except: [:index] do
    resources :comments, only: [:create]
  end

  resources :subs, except: [:destroy, :show]

  resources :subs, only: [:show]

  resource :session, only:[:new, :create, :destroy]
  resources :users, only: [:new, :create]

  resources :comments, only: [:destroy, :show] do
    resources :comments, only: [:create]
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
