# popular-back

## Get Route

**/user/:id**

id param is the _id generated by the DB upon creation.

Returns JSON with user information example below.

![Alt text](/READMEImages/ExampleReturnJSON.PNG?raw=true "ExampleReturnJSON")

## Post Route

**/user**

Creates a DB element.

Expects a JSON of the form below.

Returns JSON with user information example above.

Will not add a user if the user_name is taken. Will return an error JSON, that has the _id of the user currently owning the attempeted user name.

![Alt text](/READMEImages/ExampleSendJSON.PNG?raw=true "ExampleSendJSON")

## Put Route

**/user/:id**

id param is the _id generated by the DB upon creation.

Updates the genre_like field of the DB element corresponding to the param.

Expects a JSON of the form above.

Returns updated JSON with user information like to the example above.

