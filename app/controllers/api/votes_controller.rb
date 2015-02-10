class Api::VotesController < ApplicationController
  before_action :ensure_logged_in

  def create
    @vote = current_user.votes.new(votes_params)
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
    params.require(:vote).permit(:vote, :matching_id, :match_id)
  end
end
