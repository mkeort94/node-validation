import { setTimeout } from "node:timers/promises";
import { CreateTodo, Todo } from "../domain/todo";
import { TodoRepository } from "../domain/todo-repository";

const SIMULATED_LATENCY_MS = 300

export class InMemoryTodoRepository implements TodoRepository {
    private readonly todos = new Map<string, Todo>()

    async getAll(): Promise<Todo[]> {
        await setTimeout(SIMULATED_LATENCY_MS)
        return [...this.todos.values()]
    }

    async create(data: CreateTodo): Promise<Todo> {
        await setTimeout(SIMULATED_LATENCY_MS)

        const todo: Todo = {
            id: crypto.randomUUID(),
            ...data,
        }

        this.todos.set(todo.id, todo)

        return todo
    }
}
