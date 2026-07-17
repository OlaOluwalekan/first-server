import { z } from 'zod'

export const todoSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(255),
  completed: z.boolean(),
})
