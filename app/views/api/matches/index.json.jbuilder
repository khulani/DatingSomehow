json.array! @matches do |match|
  json.matching do
    json.extract! match.matching, :id, :title, :user_id
  end
  json.matched do
    json.extract! match.matched, :id, :title, :user_id
  end

  votes
