class CommentsController < ApplicationController
  def new
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id

    assign_post_id

    flash_e(@comment) unless @comment.save
    redirect_to @comment.post
  end

  def comment_params
    params.require(:comment).permit(:content)
  end

  def show
    @comment = Comment.find(params[:id])
  end

  def assign_post_id
    unless params[:comment_id]
      @comment.post_id = params[:post_id]
    else
      @parent = Comment.find(params[:comment_id])
      @comment.post_id = @parent.post_id
    end
  end
end
