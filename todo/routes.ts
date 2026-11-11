import { Router } from 'express'
import { TodoService } from './service/todo-service'

export function getTodoRouter(todoService: TodoService): Router {
    const todoRoutes = Router()

    todoRoutes.get('/', async (req, res) => {
        const todos = await todoService.getAll()
        res.json({ todos, count: todos.length })
    })

    todoRoutes.post('/', async (req, res) => {
        const todo = await todoService.create(req.body)
        res.status(201).json({ todo })
    })

    return todoRoutes
}
