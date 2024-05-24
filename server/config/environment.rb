# Load the Rails application.
require_relative "application"

HOSTNAME = ENV.fetch("HOSTNAME") { "zeragamba.art" }
SERVER_URL = ENV.fetch("HOST_URL") { "https://#{HOSTNAME}" }
CLIENT_URL = ENV.fetch("CLIENT_URL") { SERVER_URL }
APP_NAME = ENV.fetch("APP_NAME") { "Zeragamba Draws" }

AUTH_TOKEN_SECRET = ENV.fetch("TOKEN_SECRET")
AUTH_TOKEN_ALGO = 'HS512'

PROJECT_ROOT = Rails.root.join('..')
IMAGES_DIR = PROJECT_ROOT.join(ENV.fetch("IMAGES_DIR"))
IMAGES_URL = ENV.fetch("IMAGES_URL")

# Initialize the Rails application.
Rails.application.initialize!
