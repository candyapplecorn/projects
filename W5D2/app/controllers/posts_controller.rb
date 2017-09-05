class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)
    @post.sub_ids = post_params[:sub_ids]
    @post.user_id = current_user.id

    if @post.save
      redirect_to subs_url
    else
      flash_e(@post)
      redirect_to new_post_url
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      redirect_to subs_url
    else
      flash_e(@post)
      render :edit
    end
  end

  def new
    @post = Post.new
    @subs = Sub.all
  end

  def show
    @post = Post.includes(:comments).find(params[:id])
  end


  def edit
    @post = Post.find(params[:id])
    @subs = Sub.all
  end

  def destroy

  end

  def post_params
    params.require(:post).permit(:title, :url, :content, sub_ids: [])
  end
end
