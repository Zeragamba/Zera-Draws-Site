# Load the Rails application.
require_relative "application"

APP_HOST = ENV.fetch("APP_HOST")
APP_NAME = ENV.fetch("APP_NAME")
APP_URL = ENV.fetch("APP_URL") { "https://#{APP_HOST}" }

CLIENT_URL = ENV.fetch("CLIENT_URL") { "#{APP_URL}" }
SERVER_URL = ENV.fetch("SERVER_URL") { "#{APP_URL}/api" }
IMAGES_URL = ENV.fetch("IMAGES_URL") { "#{APP_URL}/images" }

AUTH_TOKEN_SECRET = ENV.fetch("TOKEN_SECRET")
AUTH_TOKEN_ALGO = 'HS512'

PROJECT_ROOT = Rails.root.join('..')
IMAGES_DIR = PROJECT_ROOT.join(ENV.fetch("IMAGES_DIR"))

Rails.application.config.hosts << APP_HOST
Rails.application.config.hosts << "server" # docker hostname used by OG-Injector

# Initialize the Rails application.
Rails.application.initialize!
