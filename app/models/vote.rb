class Vote < ActiveRecord::Base
  validates :user_id, :matching_id, :matched_id, :value, presence: true
  validates :user, uniqueness: { scope: [:matching_id, :matched_id] }

  belongs_to :user
end
