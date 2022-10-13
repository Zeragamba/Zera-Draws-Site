require 'rails_helper'

RSpec.describe Post, type: :model do
  it { is_expected.to respond_to :date }
  it { is_expected.to respond_to :order }
  it { is_expected.to respond_to :title }
  it { is_expected.to respond_to :ext }

  describe "#mime_type" do
    let(:picture) { Post.new(title: "example", ext: ".png") }

    {
      ".png" => "image/png",
      ".PNG" => "image/png",
      ".jpg" => "image/jpeg",
    }.each do |ext, type|
      it "returns #{type} when extension is #{ext}" do
        picture.ext = ext
        expect(picture.mime_type).to eq(type)
      end
    end
  end
end
