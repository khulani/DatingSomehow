class RemoveTitleUniqueConstraint < ActiveRecord::Migration
  def change
    remove_index :activities, :title
  end
end
