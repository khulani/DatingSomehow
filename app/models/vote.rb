class Vote < ActiveRecord::Base
  validates :match_id, :user_id, :vote, presence: true
  belongs_to :match
  belongs_to :user
end
