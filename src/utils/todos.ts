import { readJsonFile, writeToJsonFile } from './file'
import { TodoResponse } from '../types/todos.interface'

export const readTodos = async () => {
  const readFileResponse = await readJsonFile()

  let todos: TodoResponse[] = []
  if (readFileResponse.todos) {
    todos = readFileResponse.todos
  }

  return todos
}

export const writeTodos = async (todos: TodoResponse[]) => {
  const readFileResponse = await readJsonFile()
  const newJsonData = { ...readFileResponse, todos }
  await writeToJsonFile(newJsonData)
}
