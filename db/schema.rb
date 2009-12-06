# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20091206184607) do

  create_table "boks", :force => true do |t|
    t.string   "title"
    t.string   "description"
    t.string   "type"
    t.string   "content_type"
    t.string   "properties"
    t.text     "body"
    t.integer  "parent_id"
    t.integer  "position"
    t.string   "media_file_name"
    t.string   "media_content_type"
    t.integer  "media_file_size"
    t.datetime "media_updated_at"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "boks", ["content_type"], :name => "index_boks_on_content_type"
  add_index "boks", ["title"], :name => "index_boks_on_title"
  add_index "boks", ["type"], :name => "index_boks_on_type"

  create_table "users", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
