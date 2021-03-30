require 'rails_helper'

RSpec.describe "Pictures", type: :request do
  describe "GET index" do
    it "returns http success" do
      get "/pictures"
      expect(response).to have_http_status(:success)
    end

    it "lists all pictures" do
      Picture.create(date: Date.today, title: "test1", filename: "test1.png", mime_type: "image/png")
      Picture.create(date: Date.today, title: "test2", filename: "test2.png", mime_type: "image/png")

      get "/pictures"
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end

  describe "GET view" do
    let(:picture) { Picture.create(date: Date.today, title: "test", filename: "test.png", mime_type: "image/png") }

    context "when asking for JSON data" do
      it "returns http success" do
        get "/picture/#{picture.id}.json"
        expect(response).to have_http_status(:success)
      end
    end
  end
end
