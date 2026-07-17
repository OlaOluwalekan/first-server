import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import path from 'path'
import todoRoutes from './routes/todo.route'
import swaggerUI from 'swagger-ui-express'
import todoDocs from './docs/todos.json'

const app = express()

// EJS view engine setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../src/templates'))

app.use(express.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(todoDocs))
app.use('/api/todos', todoRoutes)

app.listen(3000, () =>
  console.log('Server is running on http://localhost:3000'),
)
