class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  def login!(user)
    user.ensure_session_token
    session[:token] = user.session_token
  end

  def logout!(user)
    user.reset_session_token!
    session[:token] = nil
  end

  def current_user
    return nil unless session[:token]
    @current_user ||= User.find_by(session_token: session[:token])
  end

  def logged_in?
    return session[:token] == current_user.token
  end
end
