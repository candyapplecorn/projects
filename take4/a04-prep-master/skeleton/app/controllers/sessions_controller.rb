class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    user = User.find_by_credentials(session_params)
    if user
      login!(user)
      redirect_to links_url
    else
      flash[:errors] = ["Couldn't find user"]
      render :new
    end
  end

  def destroy
    logout!
  end

  def session_params
    params.require(:user).permit(:username, :password)
  end
end
