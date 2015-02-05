# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User.create(email: 'user@user.com', password: 'password');
# User.first.activities.create(title: 'missing book');
# User.first.activities.create(title: 'surprise visitors');
# User.first.activities.create(title: 'bird sighting');
Activity.first.occurrences.create({ date: '01-01-2001', body: 'I just saw it a second ago!' })
Activity.first.occurrences.create({ date: '02-01-2001', body: 'missing a second time' })
Activity.first.occurrences.create({ date: '03-01-2001', body: 'just vaninshed' })
Activity.first.occurrences.create({ date: '04-01-2001', body: 'missing a fourth time' })

Activity.second.occurrences.create({ date: '01-01-2001', body: 'John stopped by' })
Activity.second.occurrences.create({ date: '02-01-2001', body: 'Joey stopped by' })
Activity.second.occurrences.create({ date: '03-03-2001', body: 'Susan stopped by' })
Activity.second.occurrences.create({ date: '04-01-2001', body: 'Sarah showed up' })

Activity.third.occurrences.create({ date: '01-03-2001', body: 'at the market' })
Activity.third.occurrences.create({ date: '02-01-2001', body: 'at the market' })
Activity.third.occurrences.create({ date: '03-03-2001', body: 'at the beach' })
Activity.third.occurrences.create({ date: '04-01-2001', body: "at my parents' house" })
