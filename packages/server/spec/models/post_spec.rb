require 'rails_helper'

RSpec.describe Post, type: :model do
  it { is_expected.to respond_to :date }
  it { is_expected.to respond_to :position }
  it { is_expected.to respond_to :title }
end
