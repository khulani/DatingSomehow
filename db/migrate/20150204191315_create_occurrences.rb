class CreateOccurrences < ActiveRecord::Migration
  def change
    create_table :occurrences do |t|
      t.date :date, null: false
      t.string :body
      t.string :image
      t.references :activity, index: true

      t.timestamps null: false
    end
    add_foreign_key :occurrences, :activities
    add_index :occurrences, :date
  end
end
