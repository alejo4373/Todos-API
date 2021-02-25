# Todos API

This Server/API is intended to be used by the fellows to practice making network requests, learn about HTTP status codes, their uses and differences, learn about query parameters and body data sent to appropriate endpoints. 

## Root Endpoint https://alejos-todos-api.herokuapp.com

## API Endpoints

### Users

| Method | Endpoint                     |
| ------ | ---------------------------- |
| `GET`  | `/api/users`                 |
| `GET`  | `/api/users/<user-username>` |
| `POST` | `/api/users/signup`          |

### Todos

| Method   | Endpoint               | Possible Query String/Params                  |
| -------- | ---------------------- | --------------------------------------------- |
| `GET`    | `/api/todos`           | `owner=<username>`, `completed=<true\|false>` |
| `POST`   | `/api/todos`           |                                               |
| `GET`    | `/api/todos/<todo-id>` |                                               |
| `PUT`    | `/api/todos/<todo-id>` |                                               |
| `PATCH`  | `/api/todos/<todo-id>` |                                               |
| `DELETE` | `/api/todos/<todo-id>` |                                               |

#### Query String/Params

* `owner`: A username that has todos and exists in the API.
* `completed`: A boolean `true` or `false` specifying whether the todos that are returned have been completed or not.

Example: Get all the todos belonging to **Peter** that are **completed**: `GET /todos?username=peter&completed=true`

### Admin

| Method | Endpoint | Description               |
| ------ | -------- | ------------------------- |
| `GET`  | `/admin` | Only admins can come here |

## More

* [Local Setup & Deployment](.docs/local-setup-deployment.md)
