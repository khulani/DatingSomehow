# Schema Information

## activities
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null

## matches
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
matching_id | integer   | not null, foreign key (references activities)
matched_id  | integer   | not null, foreign key (references activities)

## occurrences
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
activity_id | integer   | not null, foreign key (references activities)
date        | date      | not null
body        | string    | 
image       | string    |

## votes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
match_id    | integer   | not null, foreign key (references matches)
user_id     | integer   | not null, foreign key (references users)
vote        | integer   | (1 or -1)

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
match_id    | integer   | not null, foreign key (references matches)
comment     | string    | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
