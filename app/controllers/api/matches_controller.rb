class Api::MatchesController < ApplicationController

  def index
    if params[:activity_id]
      @matches = Activity.find(params[:activity_id]).generate_matches
      render :index
    else
      @top_voted = Vote.top_voted
      render :top_voted
    end
  end

end
