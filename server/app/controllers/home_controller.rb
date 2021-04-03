class HomeController < ApplicationController
  def index
    render json: {
      status: "Alive",
      time: DateTime.now
    }
  end
end
