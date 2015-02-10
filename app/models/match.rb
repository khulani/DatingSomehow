class Match < ActiveRecord::Base
  validates :matching_id, presence: true
  validates :matched_id, presence: true, uniqueness: { scope: :matching_id }

  belongs_to :matching, class: :Activity, foreign_key: :matching_id
  belongs_to :matched, class: :Activity, foreign_key: :matched_id

  has_many :votes
end
