require 'rails_helper'

RSpec.describe "posts", type: :request do
  describe "GET index" do
    it "returns http success" do
      get "/posts"

      expect(response).to have_http_status(:success)
    end

    it "lists all posts" do
      Post.create(date: Date.today, title: "test1", released: true)
      Post.create(date: Date.today, title: "test2", released: true)

      get "/posts"
      res = JSON.parse(response.body)
      expect(res["posts"].size).to eq(2)
    end
  end

  describe "GET view" do
    let(:post) { Post.create(date: Date.today, title: "test") }

    context "when asking for JSON data" do
      it "returns http success" do
        get "/posts/#{post.id}.json"
        expect(response).to have_http_status(:success)
      end

      it "returns json" do
        get "/posts/#{post.id}.json"
        res = JSON.parse(response.body)
        expect(res["post"]["title"]).to eq("test")
      end
    end
  end

  describe "next/prev endpoints" do
    before do
      @post1 = Post.create!(date: Date.today, title: "post1", position: 1, released: true)
      @post1.add_tags('example')
      @post2 = Post.create!(date: Date.today, title: "post2", position: 2, released: true)
      @post2.add_tags('example')
      @post3 = Post.create!(date: Date.today, title: "post3", position: 3, released: true)
      @post3.add_tags('example')
    end

    describe "GET /tag/:tag_id/:post_id/next" do
      it "retrieves the next post" do
        get "/tag/example/post1/next"
        res = JSON.parse(response.body)
        expect(res["post"]["title"]).to eq('post2')
      end

      it "skips over unreleased posts" do
        @post2.released = false
        @post2.save

        get "/tag/example/post1/next"
        res = JSON.parse(response.body)
        expect(res["post"]["title"]).to eq('post3')
      end

      it "returns 404 when there is no next post" do
        get "/tag/example/post3/next"
        expect(response.status).to eq(404)
      end

      it "returns 404 when the current post is not found" do
        get "/tag/example/post-missing/next"
        expect(response.status).to eq(404)
      end
    end

    describe "GET /tag/:tag_id/:post_id/prev" do
      it "retrieves the previous post" do
        get "/tag/example/post3/prev"
        res = JSON.parse(response.body)
        expect(res["post"]["title"]).to eq('post2')
      end

      it "includes unreleased posts if the user is an admin" do
        @post2.released = false
        @post2.save

        get "/tag/example/post3/prev"
        res = JSON.parse(response.body)
        expect(res["post"]["title"]).to eq('post1')
      end

      it "returns 404 when there is no previous post" do
        get "/tag/example/post1/prev"
        expect(response.status).to eq(404)
      end

      it "returns 404 when the current post is not found" do
        get "/tag/example/post-missing/prev"
        expect(response.status).to eq(404)
      end
    end
  end
end
