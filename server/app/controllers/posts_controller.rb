class PostsController < ApplicationController
  include Authentication

  before_action :authenticate_admin, :only => :upload

  def index
    num_per_page = 25
    page = params[:page]&.to_i || 0

    posts = Post.released.includes(:tags)

    if params[:tag]
      posts = posts.where(:tags => { slug: Slug.to_slug(params[:tag]) })
    end

    render json: PostView.render_list(posts, num_per_page: num_per_page, page: page)
  end

  def view_gallery
    num_per_page = 25
    page = params[:page]&.to_i || 0

    gallery = Gallery.find(params[:id_or_slug])

    render json: GalleryPostView.render_list(gallery.gallery_posts, num_per_page: num_per_page, page: page)
  end

  def next
    current_post = Post.find(params[:id_or_slug])

    if params[:recent]
      posts = Post.latest
    elsif params[:galleryId]
      gallery = Gallery.find(params[:galleryId])
      current_post = gallery.gallery_posts
        .where(post_id: current_post.id)
        .first

      return render_not_found if (!current_post)

      posts = gallery.gallery_posts
    else
      posts = Post.all
    end

    next_post = posts
      .released
      .where("\"order\" > :order", order: current_post.order)
      .last

    return render_not_found if (!next_post)
    render json: PostView.render(next_post)
  end

  def prev
    current_post = Post.find(params[:id_or_slug])

    if params[:recent]
      posts = Post.latest
    elsif params[:galleryId]
      gallery = Gallery.find(params[:galleryId])
      current_post = gallery.gallery_posts
        .where(post_id: current_post.id)
        .first

      return render_not_found if (!current_post)

      posts = gallery.gallery_posts
    else
      posts = Post.all
    end

    prev_post = posts
      .released
      .where("\"order\" < :order", order: current_post.order)
      .first

    return render_not_found if (!prev_post)
    render json: PostView.render(prev_post)
  end

  def upload
    image = params[:image]
    post = Post.create(picture_params)

    if post.errors.any?
      messages = post.errors.full_messages
      return render_error(message: messages.join('. '), status: 400)
    end

    post.attach(image.tempfile.path)

    render json: PostView.render(post)
  end

  def recent
    limit = params['numImages'] || 5
    posts = Post.latest.released.limit(limit)

    render json: PostView.render_list(posts)
  end

  def view
    post = Post.find(params[:id_or_slug])
    render json: PostView.render(post)
  end

  def picture_params
    params.require(:picture).permit(:title, :date, :slug, :description)
  end
end
