class ArtworkSharesController < ApplicationController
	def create
		@artwork_share = ArtworkShare.create!(artwork_share_params)
		if @artwork_share
			render json: @artwork_share
		else
			render json: @artwork_share.errors.full_messages, status: 304
		end
	end

	def destroy
		@artwork_share = ArtworkShare.find(params[:id])
		if @artwork_share.destroy!
			render json: @artwork_share
		else
			render json: @artwork_share.errors.full_messages, status: 404
		end
	end

	private
	def artwork_share_params
		params.require(:artwork_share).permit(:artwork_id, :viewer_id)
	end
end
