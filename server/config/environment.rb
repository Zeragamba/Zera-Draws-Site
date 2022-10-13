# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

AUTH_TOKEN_SECRET = ENV.fetch("TOKEN_SECRET")
AUTH_TOKEN_ALGO = 'HS512'

PROJECT_ROOT = Rails.root.join('..')
IMAGES_DIR = PROJECT_ROOT.join(ENV.fetch("IMAGES_DIR"))
IMAGES_URL = ENV.fetch("IMAGES_URL")
