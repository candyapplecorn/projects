Rails.application.routes.draw do
  get 'static_pages/index'

  namespace :api do
    resources :todos,
      only: [
        :destroy,
        :create,
        :update,
        :show,
        :index
      ],
      defaults: { format: 'json' }
  end

  root to: 'static_pages#root'
end
