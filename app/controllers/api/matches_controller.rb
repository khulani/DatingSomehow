class Api::MatchesController < ApplicationController

  def index
    if params[:activity_id]
      @matches = Activity.find(params[:activity_id]).generate_matches
      render :index
    else
      # render
    end
  end

end
