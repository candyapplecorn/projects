class SessionsController < ApplicationController
  before_action :redirect_if_already_logged_in, only:[:new]

  def new
    render :new
  end

  def create
    if login_user!
      redirect_to cats_url
    else
      redirect_to new_user_url
    end
  end

  def destroy
    if current_user
      current_user.reset_session_token!
      session[:session_token] = nil
    end
    redirect_to cats_url
  end
end
