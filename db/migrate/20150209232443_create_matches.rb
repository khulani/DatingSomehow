class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.integer :matching_id, null: false
      t.integer :matched_id, null: false,

      t.timestamps null: false
    end
    add_index :matches, [:matching_id, :matched_id], unique: true
  end
end
