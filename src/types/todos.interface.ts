import z from 'zod'
import { todoSchema } from '../models/todo.model'

export type TodoPayload = z.infer<typeof todoSchema>

export interface TodoResponse extends TodoPayload {
  id: string
  createdAt: string
  updatedAt: string
}
