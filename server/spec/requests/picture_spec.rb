require 'rails_helper'

RSpec.describe "Pictures", type: :request do
  describe "GET index" do
    it "returns http success" do
      get "/pictures"
      expect(response).to have_http_status(:success)
    end

    it "lists all pictures" do
      Picture.create(date: Date.today, title: "test1", ext: ".png")
      Picture.create(date: Date.today, title: "test2", ext: ".png")

      get "/pictures"
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end

  describe "GET view" do
    let(:picture) { Picture.create(date: Date.today, title: "test", ext: ".png") }

    context "when asking for JSON data" do
      it "returns http success" do
        get "/pictures/#{picture.id}.json"
        expect(response).to have_http_status(:success)
      end

      it "returns json" do
        get "/pictures/#{picture.id}.json"
        expect(JSON.parse(response.body)["title"]).to eq("test")
      end
    end
  end
end
