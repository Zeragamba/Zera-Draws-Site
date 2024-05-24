module ApplicationErrors
  extend ActiveSupport::Concern

  class BadRequestError < StandardError; end
end
