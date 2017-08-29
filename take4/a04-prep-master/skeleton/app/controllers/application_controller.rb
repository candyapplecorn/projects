class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user
  helper_method :logged_in?

  def login!(user)
    session[:session_token] = user.reset_session_token!
    user.save
  end
  def logout!
    return nil unless logged_in?
    user = current_user
    user.reset_session_token!
    session[:session_token] = nil
    user.save
    redirect_to new_session_url
  end
  def current_user
    User.find_by(session_token: session[:session_token])
  end
  def logged_in?
    !!current_user
  end
  def require_signed_in!
    redirect_to new_session_url unless logged_in?
  end
end
