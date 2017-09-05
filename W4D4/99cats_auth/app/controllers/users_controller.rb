class UsersController < ApplicationController
  before_action :redirect_if_already_logged_in, only:[:new]

  def new
    render :new
  end

  def create
    @user = User.new(users_params)
    if @user.save!
      login_user!
    else
      flash.now[:errors] << @user.errors.full_messages
    end
    redirect_to cats_url
  end

  private

  def users_params
    params.require(:user).permit(:username, :password, :password_digest)
  end
end
