class ViewsController < ApplicationController
  before_action :authenticate_admin, except: [:add_view]

  def add_view
    post = Post.find(params[:post_id])

    View.create!(post_id: post.id, viewer_id: params[:viewer_id])

    render json: ViewsView.render(post)
  end

  def get_views
    post = Post.find(params[:post_id])
    render json: ViewsView.render(post)
  end

  def view_params
    params.permit(:post_id, :viewer_id)
  end
end
