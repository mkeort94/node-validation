# Todo API: Live Coding Session

Hi, and thanks for taking the time to join us! 👋

This is a small, relaxed exercise. We'll explore a tiny codebase together, add a small feature, and chat about how you'd approach a few design problems. There are no trick questions, and nobody expects a perfect solution.

**It's completely fine if you don't finish.** We only have about 30 minutes, which isn't much. We care much more about how you think, the questions you ask and the decisions you make than about getting everything done. Please think out loud, ask anything at any time, and feel free to look things up in the docs, just as you would on a normal workday.

## The project

A simple REST API for managing todos, built with **Express 5**, **TypeScript** and **Zod**. Data is kept in memory, so it resets every time the server restarts.

### Getting started

```bash
npm install
npm run dev        # starts the server on http://localhost:3000 and restarts on file changes
```

Other scripts you might find useful:

| Script              | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run typecheck` | Type-checks the project                  |
| `npm run build`     | Compiles to JavaScript in `dist/`        |
| `npm start`         | Runs the compiled build                  |

### Endpoints

| Method | Path     | Description       |
| ------ | -------- | ----------------- |
| `GET`  | `/todos` | Lists every todo  |
| `POST` | `/todos` | Creates a todo    |

```bash
curl -X POST http://localhost:3000/todos \
  -H 'Content-Type: application/json' \
  -d '{"title": "Buy bread", "body": "Whole wheat"}'

curl http://localhost:3000/todos
```

A todo looks like this:

```json
{ "id": "09051dde-0844-4fb6-ba73-0eb024ec6431", "title": "Buy bread", "body": "Whole wheat" }
```

### Project structure

```
main.ts                           Entry point
server/
  express.ts                      Creates the Express app
  http/
    api-error.ts                  HTTP error class
    error-handler.ts              404 and error handling middlewares
todo/
  domain/
    todo.ts                       Zod schemas and types
    todo-repository.ts            Repository interface
  infrastructure/
    in-memory-todo-repository.ts  In-memory repository
  service/
    todo-service.ts               Business logic
  routes.ts                       /todos routes
```

## How the session works

| Time    | What we'll do                         |
| ------- | ------------------------------------- |
| ~5 min  | Read the code together                |
| ~15 min | Build a small feature                 |
| ~7 min  | Chat about design (optional)          |

These times are just a guide. If something interesting comes up, we're happy to follow it.

## Part 1: Reading the code

Take a few minutes to look around the project, then walk us through it in your own words. There's no need to understand every detail. Some questions we might talk about:

1. What happens, step by step, when a `POST /todos` request arrives?
2. What happens if a client sends malformed JSON? Which part of the code handles it?
3. The route handlers don't have any `try/catch`. How do errors still end up as JSON responses?
4. What would happen if we registered `notFoundHandler` before the `/todos` router in `main.ts`?

## Part 2: Challenge, get a todo by id

Add an endpoint that returns a single todo by its id:

```
GET /todos/:id
```

- When the todo exists, return it.
- When it doesn't exist, return a `404` with a JSON error message.

Feel free to change any file you need, and to ask about any requirement that isn't clear. Deciding how to handle the details is part of the exercise, so we're happy to discuss them with you.

## Part 3: Design questions (optional)

If we have time left, we'd love to hear your thoughts on a couple of these. There's no single right answer. We're interested in the trade-offs you see.

1. How would you test this API?
2. Validation currently happens in the service. Would you move it somewhere else, like a middleware? Why or why not?
3. Tomorrow we need to store todos in PostgreSQL instead of memory. What would change?
4. We deploy the API with three replicas behind a load balancer. Would anything break?
5. A client sends `POST /todos`, the request times out on their side, so they retry, and now there are two identical todos. How would you prevent that?
6. What do you think this API is missing before it could go to production?

---

Thanks again, and have fun with it! 🙂
