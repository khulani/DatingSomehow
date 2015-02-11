json.array! @matches do |match|
  json.matching_id match[:matching_id]
  json.matched_id  match[:matched_id]
  json.matching_title match[:matching_title]
  json.matched_title match[:matched_title]
  json.matching_count match[:matching_count]
  json.matching_total match[:matching_total]
end
