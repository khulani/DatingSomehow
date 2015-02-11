class Vote < ActiveRecord::Base
  validates :user_id, :matching_id, :matched_id, :value, presence: true
  validates :user, uniqueness: { scope: [:matching_id, :matched_id] }

  belongs_to :user
  belongs_to :matching_activity, class_name: :Activity, foreign_key: :matching_id
  belongs_to :matched_activity, class_name: :Activity, foreign_key: :matched_id

  def self.top_matches
    # Vote.where(value: -1).group(:matching_id, :matched_id).join(:votes).where(value: 1).grou
  end
end
