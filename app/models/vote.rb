class Vote < ActiveRecord::Base
  validates :user_id, :matching_id, :matched_id, :value, presence: true
  validates :user, uniqueness: { scope: [:matching_id, :matched_id] }

  belongs_to :user
  belongs_to :matching_activity, class_name: :Activity, foreign_key: :matching_id
  belongs_to :matched_activity, class_name: :Activity, foreign_key: :matched_id

  def self.top_voted
    Vote.group(:matching_id, :matched_id, :value).order(count: :desc).limit(10).count(:id)

    votes = Vote.find_by_sql(<<-SQL)
      SELECT
        matching_id, matched_id, sum(case when value = 1 then 1 else 0 end) ups,
        sum(case when value = -1 then 1 else 0 end) downs
      FROM
        votes
      GROUP BY
        matching_id, matched_id
      ORDER BY
        sum(case when value = 1 then 1 else 0 end) - sum(case when value = -1 then 1 else 0 end)
      LIMIT
        12
    SQL

    top_votes = []
    votes.each do |vote|
      if vote.matching_id
        top_votes << {
          matching_id: vote.matching_id,
          matched_id: vote.matched_id,
          ups: vote.ups,
          downs: vote.downs,
          matching_title: Activity.find(vote.matching_id).title,
          matched_title: Activity.find(vote.matched_id).title
        }
      end
    end

    top_votes
  end
end
