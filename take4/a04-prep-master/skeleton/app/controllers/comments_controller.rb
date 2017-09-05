class CommentsController < ApplicationController
  before_action :require_signed_in!

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    @comment.link_id = params[:link_id]
    if @comment.save
      redirect_to @comment.link
    else
      flash[:errors] = @comment.errors.full_messages
      redirect_to @comment.link
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to @comment.link
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
