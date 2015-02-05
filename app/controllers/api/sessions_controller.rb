class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:email], params[:password])
    if @user.nil?
      render json: { errors: ["Invalid Email or Password"] }, status: :unprocessible_entity
    else
      login!(@user)
      render :show
    end
  end

  def destroy
    logout!
    render json: {}
  end
end
