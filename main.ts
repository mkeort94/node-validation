import { createServer } from './server/express'
import { errorHandler, notFoundHandler } from './server/http/error-handler'
import { InMemoryTodoRepository } from './todo/infrastructure/in-memory-todo-repository'
import { TodoService } from './todo/service/todo-service'
import { getTodoRouter } from './todo/routes'

const PORT = Number(process.env.PORT) || 3000

function main() {
    const app = createServer()

    const todoService = new TodoService(new InMemoryTodoRepository())
    app.use('/todos', getTodoRouter(todoService))

    app.use(notFoundHandler)
    app.use(errorHandler)

    app.listen(PORT, (error) => {
        if (error) {
            console.error(`Failed to start server on port ${PORT}:`, error.message)
            process.exit(1)
        }
        console.log(`Server listening on http://localhost:${PORT}`)
    })
}

main()
