class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :title, null: false
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :activities, :users
    add_index :activities, :title, unique: true
  end
end
