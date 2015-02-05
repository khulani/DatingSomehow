class Api::OccurrencesController < ApplicationController
  before_action :ensure_logged_in, except: [:show]

  def create
    activity = current_user.activities.find(params[:activity_id])
    if activity
      occurrence = activity.occurrences.new(occurrence_params)
      if occurrence.save
        render json: occurrence
      else
        render json: { errors: occurrence.errors.full_messages }, status: :unprocessible_entity
      end
    else
      render json: { errors: ['Adding to Invalid Activity.'] }, status: :unprocessible_entity
    end
  end

  def show
    occurrence = Occurrence.find(params[:id])
    render json: occurrence
  end

  def update
    occurrence = Occurrence.find(params[:id])
    if occurrence.activity.user == current_user
      if occurrence.update(occurrence_params)
        render json: occurrence
      else
        render json: { errors: occurrence.errors.full_messages }, status: :unprocessible_entity
      end
    else
      render json: { errors: ['Updating to Invalid Activity.'] }, status: :unprocessible_entity
    end
  end

  def destroy
    occurrence = Occurrence.find(params[:id])
    activity = current_user.activities.find(occurrence.activity_id) if occurrence
    if activity && occurrence.destroy
      render json: {}, statu: :ok
    else
      render json: { errors: ["No occurrences found belonging to this user."] },
        status: :unprocessible_entity
    end
  end

  private

  def occurrence_params
    params.require(:occurrence).permit(:date, :body, :image)
  end
end
