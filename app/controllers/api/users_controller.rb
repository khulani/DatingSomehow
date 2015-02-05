class Api::UsersController < ApplicationController

  def show
    if current_user
      render :show
    else
      render json: {}
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login! @user
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def user_params
    params.permit(:email, :password)
  end
end
