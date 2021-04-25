# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

DATA_DIR = Rails.root.join("..", "data")
