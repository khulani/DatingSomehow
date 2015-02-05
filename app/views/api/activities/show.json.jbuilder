json.extract! @activity, :id, :title, :user_id

json.occurrences do
  json.array! @activity.occurrences do |occurrence|
    json.extract! occurrence, :id, :date, :body, :image, :activity_id
  end
end
