json.array! @top_voted do |match|
  json.matching_id match[:matching_id]
  json.matching_title match[:matching_title]
  json.matched_id  match[:matched_id]
  json.matched_title match[:matched_title]
  json.ups match[:ups]
  json.downs match[:downs]
end
