class Api::ActivitiesController < ApplicationController
  before_action :ensure_logged_in, only: [:create]
  def create
    @activity = current_user.activities.new(title: params[:title]);
    if @activity.save
      render json: @activity
    else
      render json: { errors: @activity.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    activity = current_user.activities.find(params[:id])
    if activity.destroy
      render json: {}, statu: :ok
    else
      render json: { errors: ["No activity found!"] }, status: :unprocessible_entity
    end
  end
end
