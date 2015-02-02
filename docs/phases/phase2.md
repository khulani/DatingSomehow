# Phase 2: JSON API and First Backbone Views

## Rails
### Models

### Controllers
Api::ActivitiesController (create, destroy, index, show)
Api::OccurrencesController (create, destroy, show, update)

### Views
* blogs/show.json.jbuilder

## Backbone
### Models
* Activity (parses nested `occurrences` association)
* Occurrence

### Collections
* Activities
* Occurrences

### Views
* ActivityIndex
* ActivityShow (composite view, contains OccurrenceShow subviews)
* OccurrenceShow

## Gems/Libraries
