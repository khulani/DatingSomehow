class Api::MatchesController < ApplicationController

  def index
    if params[:activity_id]
      @matches = matches(params[:activity_id])
      render :index
    else
      @matches = Matches.find_by_sql(<<-SQL)
        SELECT
          match.id, match.matching_id, match.matched_id,
          count(votes_up.id) up_count, count(votes_down.id) down_count
        FROM
          matches
        JOIN
          votes votes_up ON match.id = votes_up.match_id
        JOIN
          votes votes_down ON match.id = votes_down.match_id
        WHERE
          votes_up.vote = 1 AND votes_down.vote = -1
        GROUP BY
          match.id
        ORDER BY
          count(votes_up.id) - count(votes_down.id)
        LIMIT
          7
      SQL
    end
  end

  def matches (activity_id)
    matches = Activity.find_by_sql(<<-SQL)
    SELECT
    two.id id, two.title title,
    count(DISTINCT one.date) matches, total
    FROM (
      SELECT
      activities.id, date
      FROM
      activities
      JOIN
      occurrences ON activities.id = activity_id
      WHERE
      activities.id = #{activity_id}
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
      activity_id = #{activity_id}
      GROUP BY
      activity_id
    ) counts ON activity_id = one.id
    WHERE
    one.date = two.date
    GROUP BY
    one.id, two.id, two.title, total
    ORDER BY (count(DISTINCT one.date) / total) DESC
    SQL

    # activity = Activity.find(activity_id);

    matches.map { |m| [m.id, m.title, m.matches, m.total] }
  end
end
