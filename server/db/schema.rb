# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_05_13_001450) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "pictures", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.date "date", null: false
    t.integer "order", default: 0, null: false
    t.string "title", null: false
    t.integer "height", null: false
    t.integer "width", null: false
    t.string "slug", null: false
    t.string "mime_type", null: false
    t.string "ext", null: false
    t.index ["slug"], name: "index_pictures_on_slug", unique: true
  end

  create_table "pictures_tags", id: false, force: :cascade do |t|
    t.uuid "tag_id"
    t.uuid "picture_id"
    t.index ["picture_id"], name: "index_pictures_tags_on_picture_id"
    t.index ["tag_id"], name: "index_pictures_tags_on_tag_id"
  end

  create_table "tags", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "slug", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
    t.index ["slug"], name: "index_tags_on_slug", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "admin", default: false, null: false
    t.index "lower((email)::text)", name: "index_users_email", unique: true
    t.index "lower((username)::text)", name: "index_users_username", unique: true
  end

end
