# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User.create(email: 'user@user.com', password: 'password');
User.first.activities.create(title: 'missing book');
User.first.activities.create(title: 'surprise visitors');
User.first.activities.create(title: 'bird sighting');
