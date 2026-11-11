import z from "zod";
import { createTodoSchema, Todo } from "../domain/todo";
import { TodoRepository } from "../domain/todo-repository";
import { ApiError } from "../../server/http/api-error";

export class TodoService {
    constructor(private readonly repository: TodoRepository) {}

    getAll(): Promise<Todo[]> {
        return this.repository.getAll()
    }

    create(input: unknown): Promise<Todo> {
        const parsed = createTodoSchema.safeParse(input)

        if (!parsed.success) {
            throw new ApiError(
                'Invalid data',
                400,
                z.flattenError(parsed.error),
                { cause: parsed.error },
            )
        }

        return this.repository.create(parsed.data)
    }
}
