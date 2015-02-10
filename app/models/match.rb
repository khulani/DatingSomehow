class Match < ActiveRecord::Base
  attr_accessor :matching_count, :matching_total, :matched_title
  validates :matching_id, presence: true
  validates :matched_id, presence: true, uniqueness: { scope: :matching_id }

  belongs_to :matching_activity, class_name: :Activity, foreign_key: :matching_id
  belongs_to :matched_activity, class_name: :Activity, foreign_key: :matched_id

  has_many :votes
end
