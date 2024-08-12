class TagsController < ApplicationController
  before_action :authenticate_admin, :except => [:list, :view]

  def list
    tags = Tag.all
    render json: TagView.render_list(tags, page: params[:page]&.to_i || 0, num_per_page: tags.size)
  end

  def list_empty
    empty_ids = Tag.left_joins(:tagged_posts)
      .group('tags.id')
      .having('count(tagged_posts.id) = 0')
      .pluck(:id)

    empty_tags = Tag.where(id: empty_ids)

    render json: TagView.render_list(empty_tags)
  end

  def create
    tag = Tag.create(tag_params)
    render json: TagView.render_one(tag)
  end

  def view
    tag = Tag.find(params[:tag_id])
    render json: TagView.render_one(tag)
  end

  def update
    tag = Tag.find(params[:tag_id])
    tag.update!(tag_params)
    render json: TagView.render_one(tag)
  end

  def destroy
    tag = Tag.find(params[:tag_id])
    tag.destroy!

    render json: TagView.render_one(tag)
  end

  def destroy_empty
    empty_ids = Tag.left_joins(:tagged_posts)
      .group('tags.id')
      .having('count(tagged_posts.id) = 0')
      .pluck(:id)

    empty_tags = Tag.where(id: empty_ids)
    empty_tags.destroy_all

    render json: TagView.render_list(empty_tags)
  end

  def merge
    Tag.transaction do
      src_tag = Tag.find(params[:tag_id])
      dest_tag = Tag.find(params[:dest_id])

      posts = src_tag.tagged_posts.collect(&:post)
      posts.each do |post|
        next if post.tags.includes(dest_tag)
        post.tags << dest_tag
      end

      src_tag.destroy!

      render json: TagView.render_one(src_tag)
    end
  end

  def tag_params
    params.require(:tag)
      .permit(:name, :slug, :featured)
  end
end
