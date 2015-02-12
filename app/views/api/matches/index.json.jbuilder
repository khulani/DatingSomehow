json.array! @matches do |match|
  json.matching_id match[:matching_id]
  json.matched_id  match[:matched_id]
  json.matching_title match[:matching_title]
  json.matched_title match[:matched_title]
  json.matching_count match[:matching_count]
  json.matching_total match[:matching_total]
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
