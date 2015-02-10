class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.references :match, index: true
      t.references :user, index: true
      t.integer :vote

      t.timestamps null: false
    end
    add_foreign_key :votes, :matches
    add_foreign_key :votes, :users
  end
end
