import z from "zod";

export const createTodoSchema = z.object({
    title: z.string().trim().min(1).max(25),
    body: z.string().trim().max(250).nullable().default(null),
})

export const todoSchema = createTodoSchema.extend({
    id: z.uuidv4(),
})

export type CreateTodo = z.infer<typeof createTodoSchema>
export type Todo = z.infer<typeof todoSchema>
