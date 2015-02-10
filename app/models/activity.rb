class Activity < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true
  validates :user_id, presence: true

  belongs_to :user

  has_many :occurrences, dependent: :destroy


  has_many :votes

end
