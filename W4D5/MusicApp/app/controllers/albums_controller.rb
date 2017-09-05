class AlbumsController < ApplicationController
  def new
    @album = Album.new
    @bands = Band.all
    render :new, album: @album, bands: @bands, action: :new
  end

  def edit
    @album = Album.find(params[:id])
    @bands = Band.all
    render :edit, bands: @bands, album: @album, action: :edit
  end

  def show
    @album = Album.where(id: params[:id]).includes(:band).first
    render :show #album_url(@album)
  end

  def create
    @album = Album.create!(album_params)
    redirect_to album_url(@album)
  end

  def update
    @album = Album.find(params[:id])
    if @album.update!(album_params)
      redirect_to album_url(@album)
    else
      render json: @album.errors.full_messages
    end
  end

  def destroy
    @album = Album.find(params[:id])
    @band = @album.band
    @album.destroy
    redirect_to band_url(@band)
  end

  private
  def album_params
    params.require(:album).permit(:title, :year, :live, :band_id)
  end
end
