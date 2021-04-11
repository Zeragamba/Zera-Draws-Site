require 'rails_helper'

RSpec.describe Tag, type: :model do
  subject { Tag.new }
  it { is_expected.to respond_to :name }
end
