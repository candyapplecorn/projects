class UsersController < ApplicationController
  def new
    # render signup form, then call create
    render :new
  end

  def create
    # create the user and log the user in
    @user = User.new(user_params)
    if @user.save!
      login!(@user)
      redirect_to users_url
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to :new
    end
  end

  # show all the users
  def index
    @users = User.all
    render :index
  end

  # show a user
  def show
    @user = User.find(params[:id])

    if @user
      render :show
    else
      flash[:errors] = "Couldn't find a user with id #{params[:id]}"
      redirect_to users_url
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
