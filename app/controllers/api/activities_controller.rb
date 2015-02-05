class Api::ActivitiesController < ApplicationController
  before_action :ensure_logged_in, except: [:show]

  def create
    @activity = current_user.activities.new(title: params[:title]);
    if @activity.save
      render json: @activity
    else
      render json: { errors: @activity.errors.full_messages },
        status: :unprocessible_entity
    end
  end

  def show
    @activity = Activity.find(params[:id])
    @matches = matches(@activity.id) if @activity.user == current_user
    render :show
  end

  def update
    @activity = current_user.activities.find(params[:id]);
    if @activity.update(title: params[:title])
      render json: @activity
    else
      render json: { errors: @activity.errors.full_messages },
        status: :unprocessible_entity
    end
  end

  def destroy
    activity = current_user.activities.find(params[:id])
    if activity.destroy
      render json: {}, statu: :ok
    else
      render json: { errors: ["No activity found belonging to this user."] },
        status: :unprocessible_entity
    end
  end

  private

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

    matches.map { |m| [m.id, m.title, m.matches, m.total] }
  end
end
