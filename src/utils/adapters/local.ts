import fs from 'fs'
import path from 'path'

// Store the local DB next to the compiled output so it survives restarts
const LOCAL_DB_PATH = path.join(__dirname, '..', '..', '..', 'data', 'db.json')

const ensureFile = (): void => {
  const dir = path.dirname(LOCAL_DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify({ todos: [] }, null, 2), 'utf-8')
  }
}

export const localReadJson = async (): Promise<any> => {
  ensureFile()
  const raw = fs.readFileSync(LOCAL_DB_PATH, 'utf-8')
  return JSON.parse(raw)
}

export const localWriteJson = async (newData: any): Promise<void> => {
  ensureFile()
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(newData, null, 2), 'utf-8')
}
