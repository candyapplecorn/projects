class SessionsController < ApplicationController
  def new
    # login - then forward to create with params
  end

  def destroy
    # logout the user
    logout!(current_user)
    redirect_to users_url
  end

  def create
    # give the user a session  token
    @user = User.find_by_credentials(session_params)
    if @user
      login!(@user)
    end
    redirect_to users_url
  end

  private
  def session_params
    params.require(:session).permit(:username, :password)
  end
end
