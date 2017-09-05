class LinksController < ApplicationController
  before_action :require_signed_in!

  def new
    @link = current_user.links.new
  end

  def create
    @link = current_user.links.new(link_params)
    if @link.save
      redirect_to @link
    else
      flash[:errors] = @link.errors.full_messages
      render :new
    end
  end

  def edit
    @link = Link.find(params[:id])
  end

  def update
    @link = Link.find(params[:id])
    return unless current_user == @link.user
    if @link.update_attributes(link_params)
      redirect_to @link
    else
      flash[:errors] = @link.errors.full_messages
      render :edit
    end
  end

  def delete
    @link = Link.find(params[:id])
    link.destroy
    redirect_to links_url
  end

  def show
    @link = Link.find(params[:id])
  end

  def index
    @links = Link.all
  end
  def link_params
    params.require(:link).permit(:url, :title)
  end
end
