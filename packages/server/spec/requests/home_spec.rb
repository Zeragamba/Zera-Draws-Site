require 'rails_helper'

RSpec.describe "Home", type: :request do
  describe "GET /" do
    before do
      get "/"
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "returns status" do
      expect(JSON.parse(response.body)["status"]).to eq("Alive")
    end

    it "returns http success" do
      expect(JSON.parse(response.body)["time"]).to match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    end
  end
end
