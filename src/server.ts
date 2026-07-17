import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import todoRoutes from './routes/todo.route'
import swaggerUI from 'swagger-ui-express'
import todoDocs from './docs/todos.json'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send(
    'Hello World! This is a First Server!!! You think 😁😁😁. Now working?',
  )
})

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(todoDocs))
app.use('/api/todos', todoRoutes)

app.listen(3000, () =>
  console.log('Server is running on http://localhost:3000'),
)
