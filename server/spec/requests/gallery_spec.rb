require 'rails_helper'

RSpec.describe "Galleries", type: :request do
  describe "GET /list" do
    it "returns http success" do
      get "/gallery/list"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/gallery/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /view" do
    it "returns http success" do
      get "/gallery/view"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/gallery/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/gallery/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
