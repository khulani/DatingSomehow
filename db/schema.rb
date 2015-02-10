# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150210180628) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: true do |t|
    t.string   "title",      null: false
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "activities", ["title"], name: "index_activities_on_title", unique: true, using: :btree
  add_index "activities", ["user_id"], name: "index_activities_on_user_id", using: :btree

  create_table "occurrences", force: true do |t|
    t.date     "date",        null: false
    t.string   "body"
    t.string   "image"
    t.integer  "activity_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "occurrences", ["activity_id"], name: "index_occurrences_on_activity_id", using: :btree
  add_index "occurrences", ["date"], name: "index_occurrences_on_date", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

  create_table "votes", force: true do |t|
    t.integer  "matching_id", null: false
    t.integer  "matched_id",  null: false
    t.integer  "user_id"
    t.integer  "vote"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "votes", ["matching_id", "matched_id"], name: "index_votes_on_matching_id_and_matched_id", using: :btree
  add_index "votes", ["user_id"], name: "index_votes_on_user_id", using: :btree

  add_foreign_key "activities", "users"
  add_foreign_key "occurrences", "activities"
  add_foreign_key "votes", "users"
end
