# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

AUTH_TOKEN_SECRET = ENV.fetch("TOKEN_SECRET")
AUTH_TOKEN_ALGO = 'HS512'

IMAGES_DIR = ENV.fetch("IMAGES_DIR")
IMAGES_URL = ENV.fetch("IMG_SERVER_URL")
