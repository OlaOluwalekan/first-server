import express from 'express'
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from '../controllers/todo.controller'

const todoRoutes = express.Router()

todoRoutes.get('/', getAllTodos)
todoRoutes.post('/', createTodo)
todoRoutes.get('/:id', getTodoById)
todoRoutes.put('/:id', updateTodo)
todoRoutes.delete('/:id', deleteTodo)

export default todoRoutes
