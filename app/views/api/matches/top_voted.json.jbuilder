json.array! @top_voted do |match|
  json.matching_id match[:matching_id]
  json.matching_title match[:matching_title]
  json.matched_id  match[:matched_id]
  json.matched_title match[:matched_title]
  json.ups match[:ups]
  json.downs match[:downs]
  if (current_user && current_user.votes.where(
    matching_id: match[:matching_id],
    matched_id: match[:matched_id]
    ).first)
    json.vote_value current_user.votes.where(
    matching_id: match[:matching_id],
    matched_id: match[:matched_id]
    ).first.value
  end
end
