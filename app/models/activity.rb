class Activity < ActiveRecord::Base
  validates :title, presence: true, uniqueness: { scope: :user_id }
  validates :user_id, presence: true

  belongs_to :user

  has_many :occurrences, dependent: :destroy

  has_many :matching_votes, class_name: :Vote, foreign_key: :matching_id, dependent: :destroy
  has_many :matched_votes, class_name: :Vote, foreign_key: :matched_id, dependent: :destroy

  def generate_matches
    # Occurrence.where(
    #  date: a.occurrences.map { |occurrence| occurrence.date }).where.not(
    #  activity_id: a.id).includes(:activity)
    matches_data = self.class.find_by_sql(<<-SQL)
      SELECT
      two.id id, two.title title,
      count(DISTINCT one.date) match_count, total
      FROM (
        SELECT
          activities.id, date
        FROM
          activities
        JOIN
          occurrences ON activities.id = activity_id
        WHERE
          activities.id = #{self.id}
      ) one
      JOIN (
        SELECT
          activities.id, title, date
        FROM
          activities
        JOIN
          occurrences ON activities.id = activity_id
      ) two ON one.id != two.id
      JOIN (
        SELECT
          activity_id, count(*) total
        FROM
          occurrences
        WHERE
          activity_id = #{self.id}
        GROUP BY
          activity_id
      ) counts ON activity_id = one.id
      WHERE
        one.date = two.date
      GROUP BY
        one.id, two.id, two.title, total
      ORDER BY
        (count(DISTINCT one.date) / total)
      LIMIT
        11
    SQL

    updated_matches = []
    matches_data.each do |match_data|
      match = {
        matching_id: self.id,
        matched_id: match_data.id,
        matching_count: match_data.match_count,
        matching_total: match_data.total,
        matching_title: self.title,
        matched_title: match_data.title
      }
      updated_matches << match
    end

    updated_matches.sort_by { |arr| arr[:matching_count].to_f / arr[:matching_total] }
  end
end
