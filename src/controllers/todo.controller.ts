import { Request, Response } from 'express'
import { readTodos, writeTodos } from '../utils/todos'
import statusCodes from 'http-status-codes'
import { todoSchema } from '../models/todo.model'
import { TodoPayload, TodoResponse } from '../types/todos.interface'
import { v4 as uuid } from 'uuid'

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await readTodos()

    res
      .status(statusCodes.OK)
      .json({ success: true, error: null, data: { todos } })
  } catch (error) {
    console.log('Error getting todos ==> ', error)
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Error getting todos', data: null })
  }
}

export const createTodo = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const parsedBody = todoSchema.safeParse(body)
    if (!parsedBody.success) {
      throw new Error('Invalid request body')
    }

    const existingTodos = await readTodos()
    const newTodo: TodoResponse = {
      id: uuid(),
      ...parsedBody.data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const todos = [...existingTodos, newTodo]

    await writeTodos(todos)

    res
      .status(statusCodes.CREATED)
      .json({ success: true, error: null, data: { todo: newTodo } })
  } catch (error) {
    console.log('Error creating todo ==> ', error)
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Error creating todo', data: null })
  }
}

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const existingTodos = await readTodos()

    const todo = existingTodos.find((t) => t.id === id)
    if (!todo) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ success: false, error: 'Todo not found', data: null })
    }

    res
      .status(statusCodes.OK)
      .json({ success: true, error: null, data: { todo } })
  } catch (error) {
    console.log('Error getting todo by id ==> ', error)
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Error getting todo by id', data: null })
  }
}

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const body = req.body
    const parsedBody = todoSchema.safeParse(body)
    if (!parsedBody.success) {
      throw new Error('Invalid request body')
    }

    const existingTodos = await readTodos()
    const todo = existingTodos.find((t) => t.id === id)
    if (!todo) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ success: false, error: 'Todo not found', data: null })
    }

    const updatedTodo: TodoResponse = {
      ...todo,
      ...parsedBody.data,
      updatedAt: new Date().toISOString(),
    }

    const todos = existingTodos.map((t) => (t.id === id ? updatedTodo : t))

    await writeTodos(todos)

    res
      .status(statusCodes.OK)
      .json({ success: true, error: null, data: { todo: updatedTodo } })
  } catch (error) {
    console.log('Error updating todo ==> ', error)
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Error updating todo', data: null })
  }
}

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const existingTodos = await readTodos()
    const todo = existingTodos.find((t) => t.id === id)
    if (!todo) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ success: false, error: 'Todo not found', data: null })
    }

    const todos = existingTodos.filter((t) => t.id !== id)
    await writeTodos(todos)
    res
      .status(statusCodes.OK)
      .json({ success: true, error: null, data: { todo } })
  } catch (error) {
    console.log('Error deleting todo ==> ', error)
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Error deleting todo', data: null })
  }
}
