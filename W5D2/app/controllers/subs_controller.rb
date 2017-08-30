class SubsController < ApplicationController
  before_action :require_login
  before_action :current_is_moderator?, only: [:edit]

  def new
    @sub = Sub.new
  end

  def create
    @sub = Sub.new(sub_params)
    @sub.user_id = current_user.id
    if @sub.save
      redirect_to sub_url @sub
    else
      flash_e(@sub)
      render :new
    end
  end

  def edit
    @sub = Sub.find(params[:id])
  end

  def update
    @sub = Sub.find(params[:id])
    if @sub.update(sub_params)
      redirect_to sub_url @sub
    else
      flash_e(@sub)
      render :edit
    end
  end

  def show
    @sub = Sub.find(params[:id])
    @posts = @sub.posts
  end

  def index
    @subs = Sub.all.includes(:moderator, :posts)
  end

  def current_is_moderator?(sub)
    current_user == sub.moderator
  end

  def sub_params
    params.require(:sub).permit(:title, :description)
  end
end
