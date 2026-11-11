# Todo API

A simple REST API for managing todos, built with **Express 5**, **TypeScript** and **Zod** for validation.

## Requirements

- Node.js 22 or later

## Getting started

```bash
npm install
npm run dev        # development mode, restarts on file changes
```

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Runs `main.ts` in watch mode with `tsx`      |
| `npm run build`     | Compiles to JavaScript in `dist/`            |
| `npm start`         | Runs the compiled build                      |
| `npm run typecheck` | Type-checks without emitting files           |

The server listens on port `3000`; override it with the `PORT` environment variable:

```bash
PORT=4000 npm run dev
```

## Endpoints

### `GET /todos`

Returns all todos.

```json
// 200 OK
{
  "todos": [{ "id": "2f28d17b-beda-4c9d-b959-a8ae32180bf1", "title": "Buy bread", "body": null }],
  "count": 1
}
```

### `POST /todos`

Creates a todo.

| Field   | Type             | Rules                                              |
| ------- | ---------------- | -------------------------------------------------- |
| `title` | `string`         | Required, 1–25 characters (whitespace is trimmed)  |
| `body`  | `string \| null` | Optional, up to 250 characters; defaults to `null` |

```bash
curl -X POST http://localhost:3000/todos \
  -H 'Content-Type: application/json' \
  -d '{"title": "Buy bread", "body": "Whole wheat"}'
```

```json
// 201 Created
{ "todo": { "id": "09051dde-0844-4fb6-ba73-0eb024ec6431", "title": "Buy bread", "body": "Whole wheat" } }
```

Fields not defined in the schema (such as `id`) are ignored.

## Errors

Every error response is JSON with a `message` field.

Validation errors return `400` with every error, split into errors about the whole object (`formErrors`) and errors per field (`fieldErrors`):

```json
// 400 Bad Request
{
  "message": "Invalid data",
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "title": ["Too small: expected string to have >=1 characters"],
      "body": ["Invalid input: expected string, received number"]
    }
  }
}
```

| Status | When                                          |
| ------ | --------------------------------------------- |
| `400`  | Invalid data or malformed JSON                |
| `404`  | Unknown route                                 |
| `500`  | Unexpected error (logged to the console)      |

## Project structure

```
main.ts                           Entry point: wires dependencies and starts the server
server/
  express.ts                      Creates the Express app with its base middlewares
  http/
    api-error.ts                  HTTP error carrying a status and details
    error-handler.ts              Centralized 404 and error handling
todo/
  domain/
    todo.ts                       Zod schemas and inferred types
    todo-repository.ts            Persistence contract
  infrastructure/
    in-memory-todo-repository.ts  In-memory repository implementation
  service/
    todo-service.ts               Business logic and validation
  routes.ts                       HTTP routes for the /todos resource
```

## Design decisions

- **Zod as the single source of truth.** TypeScript types are inferred from the schemas, so validation and types never drift apart.
- **Separate service and repository.** `TodoService` validates and applies the rules; `TodoRepository` only persists. The repository is injected, so it can be swapped for a real database without touching the service or the routes.
- **Validation in the service.** The service accepts `unknown` and validates it itself, so no input reaches the repository unvalidated, wherever it comes from.
- **Centralized error handling.** Routes have no `try/catch`: Express 5 forwards rejected promises to the error middleware, which turns each error into a JSON response.
- **In-memory persistence.** Data is lost on restart. The repository simulates 300 ms of latency to mimic a real database.
