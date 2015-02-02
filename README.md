# Acto-Explaino

[Heroku link][heroku]

[heroku]: #

## Minimum Viable Product
Acto-Explaino is a fusion of Tumblr and Trello built on Rails and Backbone.
Users can log a series of activity occurrences and find ‘possible’ explanations
or causes for those activities...

- [x] Create accounts and sessions for logging In/out
- [x] Create ‘Activity Timelines’
- [x] Create ‘Activity Occurences’
- [x] Find ‘Timeline Matches’
- [x] Create ‘Comments’ for ’Timeline Matches’
- [x] Vote a ’Timeline Match’ up or down in popularity
- [x] Top matches feed


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Basic Blogs and Posts (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create Activities and
Entries using simple text forms in Rails views. The most important part of this
phase will be pushing the app to Heroku and ensuring that everything works
before moving on to phase 2.

[Details][phase-one]

### Phase 2: JSON API and Backbone Views (~2 days)
I will add API routes to serve blog and post data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, the existing Rails views will have been ported over to Backbone.
Backbone views should allow editing as well

[Details][phase-two]

### Phase 3: Activity Match Finding with Views  (~1 days)
I will expand my Rails Activity' model to query for matches and display those
results with Backbone views. I will add an additional timeline for side by side
comparisons.

[Details][phase-three]

### Phase 4: Occurrence UI (~1-2 days)
I will expand the UI functionality to allow creating new 'occurrences' by dragging to
the timeline or clicking on the timeline. I will make 'occurrences' on the
timeline open and close able.

[Details][phase-four]

### Phase 5: Match Voting and 'Hot Matches' List (~2 days)
I will add functionality to allow users can vote a match 'up' or 'down' to
determine a match's popularity. Most popular matches will be listed on the
'Hot Matches'. I will have a 'Highest Percentage Matches' pages to view matches
with the highest percentages.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Add comments to matches
- [ ] Scrollable 'Activity' timelines
- [ ] Zoomable 'Activity' timelines
- [ ] Drag and Upload photos when creating or editing 'Occurrences'
- [ ] User avatars
- [ ] Add notifications

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
