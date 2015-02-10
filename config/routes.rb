Rails.application.routes.draw do
  root to: 'root#root'

  namespace :api, defaults: { format: :json } do
    resource :user, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :activities, only: [:create, :show, :update, :destroy] do
      resources :matches, only: :index
    end
    resources :occurrences, only: [:create, :show, :update, :destroy]
    resources :matches, only: [:index, :show]
    resources :votes, only: [:create, :update]
  end
end
