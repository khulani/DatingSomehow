json.extract! @activity, :id, :title, :user_id

json.email @activity.user.email

json.occurrences do
  json.array! @activity.occurrences.order(:date) do |occurrence|
    json.extract! occurrence, :id, :date, :body, :image, :activity_id
  end
end

if @matches.length > 0
  json.matches do
    json.array! @matches do |match|
      json.id match.id
      json.matched_id = match.matched_activity.id
      json.title match.matched_title
      json.count match.matching_count
      json.total match.matching_total
    end
  end
end
