class CreateBoks < ActiveRecord::Migration
  def self.up
    create_table :boks do |t|
      t.string :title
      t.string :description
      t.string :type
      t.string :content_type
      t.string :properties, :length => 4096
      t.text :body
      t.references :parent
      t.integer :position
      t.string :media_file_name
      t.string :media_content_type
      t.integer :media_file_size
      t.datetime :media_updated_at
      t.references :user
      t.timestamps
    end

    add_index :boks, :type
    add_index :boks, :title
    add_index :boks, :content_type

  end

  def self.down
    drop_table :boks
  end
end
