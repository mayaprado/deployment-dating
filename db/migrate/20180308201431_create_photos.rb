class CreatePhotos < ActiveRecord::Migration[5.1]
  def change
    create_table :photos do |t|
      t.string :url
      t.bigint "user_id"
      t.index ["user_id"], name: "index_photos_on_user_id"

      t.timestamps
    end
  end
end
