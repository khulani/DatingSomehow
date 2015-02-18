# Somehow We're dating

[Heroku link][heroku]

[heroku]: http://www.somehowdating.com

## Minimum Viable Product
"Somehow We're Dating" is a web app built on Rails and Backbone.
Users can create timeline journals for tracking a reoccurring event as well as find other timelines that coincidentally line up with theirs.

For example, say you track every occurrence of your favorite jacket going missing and you find that it has a 92% match to the activity timeline from some random girl named Suzy for every time she goes on a date. So according to 'Somehow We're Dating', the reason for favorite jacket going missing is because Suzy is on a date. So what does Suzy have anything to do with your favorite jacket being missing? Maybe if you checked out her timeline occurrence entries, you'll find a picture of her and your roommate wearing your favorite jacket :)

- [x] Create accounts and sessions for logging In/out
- [x] Create ‘Timelines’
- [x] Create ‘Occurences’
- [x] Generate ‘Timeline Synchronicities’
- [x] Vote ’Timeline Synchronicities’ up or down in popularity
- [x] Create a 'Top Synchronicities' list


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Timelines and Occurrences (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create Timelines and
Occurrences using simple text forms in Rails views. The most important part of this
phase will be pushing the app to Heroku and ensuring that everything works
before moving on to phase 2.

[Details][phase-one]

### Phase 2: JSON API and Backbone Views (~2 days)
I will add API routes to serve blog and post data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, the existing Rails views will have been ported over to Backbone.
Backbone views should allow editing as well

[Details][phase-two]

### Phase 3: Timeline Synchronicities with Views  (~1 days)
I will expand my Rails 'Timeline' model to query for synchronicities and display those
results with Backbone views. I will add an additional timeline for side by side
comparisons.

[Details][phase-three]

### Phase 4: Occurrence UI (~1-2 days)
I will expand the UI functionality to allow creating new 'occurrences' by double clicking and sliding the cursor up and down on the timeline. I will make 'occurrence' details on the timeline open and closeable.

[Details][phase-four]

### Phase 5: Synchronicities Voting and 'Top Synchronicities' List (~2 days)
I will add functionality to allow users can vote a match 'up' or 'down' to
determine a match's popularity. The most popular matches will be listed under 'Top Synchroncities'.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Add comments to matches
- [x] Scrollable 'Activity' timelines
- [ ] Zoomable 'Activity' timelines
- [ ] Drag and Upload photos when creating or editing 'Occurrences'
- [ ] User avatars
- [ ] Add notifications

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
