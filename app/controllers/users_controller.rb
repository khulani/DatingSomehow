class UsersController < ApplicationController

  def show
    user = current_user || {}
    render json: user, only: [:id, :email]
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, only: [:id, :email]
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
