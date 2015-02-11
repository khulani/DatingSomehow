class Api::VotesController < ApplicationController
  before_action :ensure_logged_in

  def create
    @vote = current_user.votes.find_or_initialize_by(votes_params) do |user|
      user.value = params[:value]
    end

    if (@vote.save)
      render json: @vote
    else
      render json: { errors: ["Must log in to vote"] }, status: :unauthorized
    end
  end

  def update
    @vote = current_user.votes.find(params[:id]);
    if (@vote.save)
      render json: @vote
    else
      render json: { errors: ["Vote not found"] }, status: :unauthorized
    end
  end

  private

  def votes_params
    params.permit(:matching_id, :matched_id)
  end
end
