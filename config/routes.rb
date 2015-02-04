Rails.application.routes.draw do
  root to: 'root#root'

  resource :user, only: [:create, :show], defaults: { format: :json }
  resource :session, only: [:create, :destroy], defaults: { format: :json }
end
