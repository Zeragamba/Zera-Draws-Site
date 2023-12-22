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

ActiveRecord::Schema.define(version: 2023_12_22_192115) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "galleries", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "slug", null: false
    t.integer "position", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "image_id"
    t.index ["name"], name: "index_galleries_on_name"
    t.index ["position"], name: "index_galleries_on_position"
    t.index ["slug"], name: "index_galleries_on_slug"
  end

  create_table "gallery_posts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "gallery_id", null: false
    t.uuid "post_id", null: false
    t.integer "position", null: false
  end

  create_table "images", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "post_id"
    t.string "filename", null: false
    t.integer "height"
    t.integer "width"
    t.string "mime_type"
    t.string "ext"
    t.integer "position", default: 0, null: false
    t.index ["post_id"], name: "index_images_on_post_id"
  end

  create_table "meta", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "group", null: false
    t.string "key", null: false
    t.string "value", null: false
    t.index ["group", "key"], name: "index_meta_on_group_and_key", unique: true
    t.index ["group"], name: "index_meta_on_group"
    t.index ["key"], name: "index_meta_on_key"
  end

  create_table "posts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "date", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.integer "position", default: 0, null: false
    t.string "title", null: false
    t.string "slug", null: false
    t.text "description"
    t.boolean "released", default: false, null: false
    t.datetime "scheduled"
    t.index ["slug"], name: "index_posts_on_slug", unique: true
  end

  create_table "tagged_posts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "tag_id"
    t.uuid "post_id"
    t.index ["post_id"], name: "index_tagged_posts_on_post_id"
    t.index ["tag_id"], name: "index_tagged_posts_on_tag_id"
  end

  create_table "tags", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "slug", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "featured", default: false
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

  create_table "views", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "timestamp", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.uuid "viewer_id", null: false
    t.uuid "post_id"
    t.index ["post_id"], name: "index_views_on_post_id"
    t.index ["timestamp"], name: "index_views_on_timestamp"
    t.index ["viewer_id"], name: "index_views_on_viewer_id"
  end

  add_foreign_key "galleries", "images"
  add_foreign_key "views", "posts"
end
