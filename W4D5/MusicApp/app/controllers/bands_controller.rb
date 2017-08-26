class BandsController < ApplicationController
  def index
    @bands = Band.all
    render :index
  end

  def show
    @band = Band.where(id: params[:id]).includes(:albums).first
    render :show
  end

  def create
    @band = Band.new(band_params)
    if @band.save!
      redirect_to bands_url
    else
      render json: @band.errors.full_messages
    end
  end

  def new
    # show the new form!
    @band = Band.new
    render :new
  end

  def edit
    @band = Band.find(params[:id])
    render :edit
  end

  def update
    # show the new/update form!
    @band = Band.find(params[:id])
    if @band.update!(band_params)
      redirect_to band_url(@band)
    else
      render json: @band.errors.full_messages
    end
  end

  def destroy
    @band = Band.find(params[:id])
    @band.destroy
    redirect_to bands_url
  end

  private
  def band_params
    params.require(:band).permit(:name)
  end
end
