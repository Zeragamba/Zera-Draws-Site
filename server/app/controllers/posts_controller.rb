class PostsController < ApplicationController
  before_action :authenticate_admin, :except => [
    :first,
    :index,
    :latest,
    :next,
    :prev,
    :recent,
    :view,
    :view_gallery,
    :view_tagged,
  ]

  NUM_POSTS_PER_PAGE = 25

  def index
    page = params[:page]&.to_i || 0
    render json: PostView.render_list(Post.latest.released, num_per_page: NUM_POSTS_PER_PAGE, page: page)
  end

  def view_gallery
    page = params[:page]&.to_i || 0

    gallery = Gallery.find(params[:gallery_id])

    render json: GalleryPostView.render_list(gallery.gallery_posts.latest.released, num_per_page: NUM_POSTS_PER_PAGE, page: page)
  end

  def view_tagged
    page = params[:page]&.to_i || 0

    tag = Tag.find(params[:tag_id])

    render json: TaggedPostView.render_list(tag.tagged_posts.latest.released, num_per_page: NUM_POSTS_PER_PAGE, page: page)
  end

  def next
    if params[:gallery_id]
      gallery = Gallery.find(params[:gallery_id])
      raise ActiveRecord::RecordNotFound.new("Gallery not found") if !gallery

      cur_post = gallery.find_post(params[:post_id])
    elsif params[:tag_id]
      tag = Tag.find(params[:tag_id])
      raise ActiveRecord::RecordNotFound.new("Tag not found") if !tag

      cur_post = tag.find_post(params[:post_id])
    else
      cur_post = Post.find(params[:post_id])
    end

    raise ActiveRecord::RecordNotFound.new("Post not found") if !cur_post

    next_post = cur_post.next
    raise ActiveRecord::RecordNotFound.new("Post not found") if !next_post

    render json: PostView.render(next_post)
  end

  def prev
    if params[:gallery_id]
      gallery = Gallery.find(params[:gallery_id])
      raise ActiveRecord::RecordNotFound.new("Gallery not found") if !gallery

      cur_post = gallery.find_post(params[:post_id])
    elsif params[:tag_id]
      tag = Tag.find(params[:tag_id])
      raise ActiveRecord::RecordNotFound.new("Tag not found") if !tag

      cur_post = tag.find_post(params[:post_id])
    else
      cur_post = Post.find(params[:post_id])
    end

    raise ActiveRecord::RecordNotFound.new("Post not found") if !cur_post

    prev_post = cur_post.prev
    raise ActiveRecord::RecordNotFound.new("Post not found") if !prev_post

    render json: PostView.render(prev_post)
  end

  def upload
    Post.transaction do
      images = params[:images]

      post = Post.create!(post_params)
      post.update_tags!(params[:tags]) if params[:tags]

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

  def latest
    post = Post.latest.released.first
    render json: PostView.render(post)
  end

  def first
    post = Post.released.reorder(position: :asc).first
    render json: PostView.render(post)
  end

  def view
    post = Post.find(params[:post_id])
    render json: PostView.render(post)
  end

  def update
    Post.transaction do
      post = Post.find(params[:post_id])

      post.update!(post_params) if params[:post]
      post.update_tags!(params[:tags]) if params[:tags]

      images = params[:images] || Hash.new
      images.each_value do |image_data|
        tmp_file = image_data["file"].tempfile if image_data["file"]

        case image_data["action"]
          when 'add'
            image = Image.create!(
              filename: image_data["filename"],
              position: image_data["position"],
              post: post,
            )
            image.attach(tmp_file.path)
          when 'edit'
            image = Image.find(image_data["id"])

            if image_data["position"]
              image.position = image_data["position"]
            end

            if image_data["filename"]
              image.filename = image_data["filename"]
            end

            if image_data["file"]
              image.destroy!

              new_image = Image.create!(
                filename: image["filename"],
                position: image["position"],
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

  def destroy
    Post.transaction do
      post = Post.find(params[:post_id])
      post.destroy!

      render json: PostView.render(post)
    end
  end

  def post_params
    params.require(:post)
      .permit(:title, :position, :date, :slug, :description, :released, :scheduled)
  end
end
