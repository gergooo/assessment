# NodeJS Developer - Exercise 1

This is my second homework for [Digital Natives](https://www.digitalnatives.hu).

For the first one, go to the [numbers-to-words](https://github.com/gergooo/digitalnatives-assessment/tree/numbers-to-words) branch.

Please see the original instructions on the bottom.

## Implementation

The implementation is based on the `Express` framework, on `fs` as "db" and on `uuid` as the unique id generator.

You asked for unit tests in the instructions. Regarding REST APIs, I've found two approaches on what a unit is:

- the usual explanation: one unit is one file/class/etc.,
- and another, rather interesting one: one unit is one endpoint.

While I agree that testing an endpoint is rather an integration test, since it can cover external dependencies (including db) if they are not mocked, I used this second approach as it looked very descriptive, with the help of `Mocha`, `Chai`, `Chai-Http` and `@sinonjs/fake-timers` in a test-driven fashion, supported by `Postman` for additional manual testing.

## Original instructions

> ## Instructions
>
> - Fork this project.
> - Write tests.
> - Commit the important milestones and not just the final result.
>
> ## Exercise description
>
> Create a RESTful API that provides access to a collection called "todos" that contains just the following fields:
>
> - `id`: String. Unique identifier of the todo (can't be set)
> - `text`: String. Can only contain english letters. (must be set)
> - `priority`: Number. Integer in the range from 1 to 5. (default value is 3)
> - `done`: Boolean. (default value is false)
>
> The API must accept JSON request body, and must provide JSON response body.
>
> ## Endpoints
>
> ### GET /todos
>
> List all of the todos as an array of the todo objects.
>
> ### POST /todos
>
> Creates a new todo, sets the given fields from the request body. Returns the new todo object.
>
> ### GET /todos/:id
>
> Returns the todo object.
>
> ### PUT /todos/:id
>
> Updates the given fields in the todo. Returns the new todo object.
>
> ### DELETE /todos/:id
>
> Removes a todo from the collection.
>
> ## Tasks
>
> 1. Save all of the todos in a JSON file, if any modification happens. Load the collection from this file when the server restarts
> 2. Remove todos that is done for 5 minutes
> 3. Create unit tests for the API
