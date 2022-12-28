class PostsController < ApplicationController
  include Authentication

  before_action :authenticate_admin, :only => [:upload, :update]

  def index
    num_per_page = 25
    page = params[:page]&.to_i || 0
    posts = current_user.admin ? Post.all : Post.released

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
    Post.transaction do
      images = params[:images]
      post = Post.create!(post_params)

      if images.empty?
        return render_error(message: "At least one image is required", status: 400)
      end

      images.each_value do |image_data|
        image = Image.create!(filename: image_data["filename"], post: post)
        image.attach(image_data["file"].tempfile.path)
      end

      render json: PostView.render(post)
    end
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

  def update
    Post.transaction do
      post = Post.find(params[:id_or_slug])

      if params[:post]
        post.update!(post_params)
      end

      images = params[:images] || Hash.new
      images.each_value do |image_data|
        tmp_file = image_data["file"].tempfile if image_data["file"]

        case image_data["action"]
          when 'add'
            image = Image.create!(
              filename: image_data["filename"],
              order: post.images.size,
              post: post,
            )
            image.attach(tmp_file.path)
          when 'edit'
            image = Image.find(image_data["id"])

            if image_data["order"]
              image.order = image_data["order"]
            end

            if image_data["filename"]
              image.filename = image_data["filename"]
            end

            if image_data["file"]
              image.destroy!

              new_image = Image.create!(
                filename: image["filename"],
                order: image["order"],
                post: post,
              )
              new_image.attach(tmp_file.path)

              image = new_image
            end

            image.save!
          when 'remove'
            image = Image.find(image_data["id"])
            image.destroy!
          else
            raise Error("Unknown image action #{image_data["action"]}")
        end
      end

      render json: PostView.render(post)
    end
  end

  def post_params
    params.require(:post)
      .permit(:title, :order, :date, :slug, :description, :released)
  end
end
