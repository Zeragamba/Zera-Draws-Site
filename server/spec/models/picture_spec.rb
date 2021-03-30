require 'rails_helper'

RSpec.describe Picture, type: :model do
  it { is_expected.to respond_to :date }
  it { is_expected.to respond_to :order }
  it { is_expected.to respond_to :title }
  it { is_expected.to respond_to :filename }
  it { is_expected.to respond_to :mime_type }
end
