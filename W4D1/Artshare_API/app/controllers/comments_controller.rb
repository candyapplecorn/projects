class CommentsController < ApplicationController
	def show 
		@comment = Comment.find(params[:id])
		if @comment
			render json: @comment, status: 200
		else
			render json: @comment.errors.full_messages, status: 404
		end
	end

	def index 
		if comment_params[:user_id]
			@user = User.find(comment_params[:user_id])
			@comments = @user.comments
			render json: @comments, status: 200
		elsif comment_params[:artwork_id]
			@artwork = Artwork.find(comment_params[:artwork_id])
			@comments = @artwork.comments
			render json: @comments, status: 200
		else
			@comments = Comment.all
			render json: @comments, status: 200
		end
	end

	def create
		@comment = Comment.create(comment_params)
		if @comment.save!
			render json: @comment, status: 201
		else
			render json: @comment.errors.full_messages, status: :unprocessable_entity
		end
	end

	def update
		@comment = Comment.find(params[:id])
		if @comment.update!(comment_params)
			render json: @comment
		else
			render json: @comment.errors.full_messages, status: 404
		end
	end

	def destroy
		@comment = Comment.find(params[:id])
		if @comment.destroy!
			index
		else
			render json: @comment.errors.full_messages, status: 404
		end
	end

	private
	def comment_params
		params.require(:comment).permit(:author_id, :artwork_id, :body, :user_id)
	end
end
