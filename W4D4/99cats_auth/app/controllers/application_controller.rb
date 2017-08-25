class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user
  helper_method :current_user_is_owner?

  def current_user
    @user = User.find_by(session_token: session[:session_token])
  end

  def login_user!
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user.nil?
      flash.now[:errors] = "user does not exist"
    else
      @user.reset_session_token!
      session[:session_token] = @user.session_token
    end
    return @user
  end

  def redirect_if_already_logged_in
    redirect_to cats_url if current_user
  end

  def current_user_is_owner?
    @cat ||= Cat.find(params[:id])
    current_user.cats.where('id = :id', id: params[:id]).count != 0
  end

  def redirect_to_cats
    unless current_user_is_owner?
      flash.now[:errors] = ["#{current_user.username} does not own #{@cat.name}"]
      redirect_to cats_url
    end
  end
end
