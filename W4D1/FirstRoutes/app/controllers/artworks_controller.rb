class ArtworksController < ApplicationController
	def create
		@artwork = Artwork.create!(artwork_params)
		if @artwork
			render json: @artwork
		else
			render json: @artwork.errors.full_messages, status: :unprocessable_entity
		end
	end

	def index
		@user = User.find(params[:user_id])
		
		@artworks = @user.artworks + @user.shared_artworks
		render json: @artworks
	end

	def update
		@artwork = Artwork.find(params[:id])
		if @artwork.update!(artwork_params)
			render json: @artwork
		else
			render json: @artwork.errors.full_messages, status: 304 #not modified
		end
	end

	def destroy
		@artwork = Artwork.find(params[:id])
		if @artwork.destroy!
			index
		else
			render json: @artwork.errors.full_messages, status: 304
		end
	end

	def show
		@artwork = Artwork.find(params[:id])
		if @artwork
			render json: @artwork
		else
			render json: @artwork.errors.full_messages, status: 404
		end
	end

	private
	def artwork_params
		params.require(:artworks).permit(:title, :image_url, :artist_id)
	end
end
