class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(params.require(:user).permit(:username, :password))
    if @user.save
      login(@user)
      redirect_to subs_url
    else
      flash_e(@user)
      render :new
    end
  end
end
