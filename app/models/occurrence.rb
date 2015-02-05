class Occurrence < ActiveRecord::Base
  validates :date, presence: true, uniqueness: { scope: :activity_id }
  validates :activity_id, presence: true
  belongs_to :activity

end
