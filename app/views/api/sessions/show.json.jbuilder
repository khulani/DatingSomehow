json.extract! current_user, :id, :email

json.activities do
  json.array! current_user.activities do |activity|
    json.extract! activity, :id, :title, :user_id
  end
end
