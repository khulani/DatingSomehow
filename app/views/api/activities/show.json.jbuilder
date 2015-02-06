json.extract! @activity, :id, :title, :user_id

json.occurrences do
  json.array! @activity.occurrences.order(:date) do |occurrence|
    json.extract! occurrence, :id, :date, :body, :image, :activity_id
  end
end

if @matches
  json.matches do
    json.array! @matches do |match|
      json.id match[0]
      json.title match[1]
      json.count match[2]
      json.total match[3]
    end
  end
end
