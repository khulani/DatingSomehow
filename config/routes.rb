Rails.application.routes.draw do
  root to: 'root#root'

  namespace :api, defaults: { format: :json } do
    resource :user, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :activities, only: [:create, :show, :update, :destroy]
    resources :occurrences, only: [:create, :show, :update, :destroy]
  end
end
