class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :matching_id, null: false
      t.integer :matched_id, null: false
      t.references :user, index: true
      t.integer :vote

      t.timestamps null: false
    end
    add_foreign_key :votes, :users
    add_index :votes, [:matching_id, :matched_id]
  end
end
