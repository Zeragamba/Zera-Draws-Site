class TagsController < ApplicationController
  before_action :authenticate_admin, :only => [:create, :update, :destroy]

  def list
    tags = Tag.all
    render json: TagView.render_list(tags, page: params[:page]&.to_i || 0)
  end

  def create
    tag = Tag.create(tag_params)
    render json: TagView.render(tag)
  end

  def view
    tag = Tag.find(params[:id_or_slug])
    render json: TagView.render(tag)
  end

  def update
    tag = Tag.find(params[:id_or_slug])
    tag.update!(tag_params)
    render json: TagView.render(tag)
  end

  def destroy
    tag = Tag.find(params[:id_or_slug])
    tag.destroy!
    render json: TagView.render(tag)
  end

  def tag_params
    params.permit(:name, :slug)
  end

end
