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
        up.matching_id, up.matched_id, count(DISTINCT up.user_id) ups, count(DISTINCT down.user_id) downs
      FROM (
        SELECT
          matching_id, matched_id, user_id
        FROM
          votes
        WHERE
          value = 1
      ) up
      FULL OUTER JOIN (
        SELECT
          matching_id, matched_id, user_id
        FROM
          votes
        WHERE
          value = -1
      ) down ON up.matching_id = down.matching_id AND up.matched_id = down.matched_id
      GROUP BY
        up.matching_id, up.matched_id
      ORDER BY
        count(DISTINCT up.user_id) - count(DISTINCT down.user_id)
      LIMIT
        11
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
