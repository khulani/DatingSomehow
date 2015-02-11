class Api::VotesController < ApplicationController
  before_action :ensure_logged_in

  def create
    @vote = current_user.votes.find_or_initialize_by(votes_params)
    if @vote.value == params[:value]
      matching_id = @vote.matching_id;
      matched_id = @vote.matched_id;
      @vote.destroy();
      render json: { matching_id: matching_id, matched_id: matched_id, value: 0 }
    else
      @vote.value = params[:value];
      if (@vote.save)
        render json: @vote, only: [:id, :matching_id, :matched_id, :vote]
      else
        render json: { errors: ["Must log in to vote"] }, status: :unauthorized
      end
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
