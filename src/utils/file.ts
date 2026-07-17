import { cloudinaryReadJson, cloudinaryWriteJson } from './adapters/cloudinary'
import { localReadJson, localWriteJson } from './adapters/local'

/**
 * Returns true when all four Cloudinary env variables are present.
 * If any are missing the app falls back to the local JSON file adapter.
 */
const isCloudinaryConfigured = (): boolean => {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_JSON_FILE_URL &&
    process.env.CLOUDINARY_PUBLIC_ID
  )
}

const useCloudinary = isCloudinaryConfigured()

if (useCloudinary) {
  console.log('📦 Storage: Cloudinary')
} else {
  console.log('💾 Storage: Local file (data/db.json) — set Cloudinary env vars to switch')
}

export const readJsonFile = async (): Promise<any> => {
  try {
    if (useCloudinary) {
      return await cloudinaryReadJson()
    }
    return await localReadJson()
  } catch (error) {
    console.log('Error reading file ==>', error)
    return { todos: [] }
  }
}

export const writeToJsonFile = async (newData: any): Promise<void> => {
  try {
    if (useCloudinary) {
      await cloudinaryWriteJson(newData)
    } else {
      await localWriteJson(newData)
    }
  } catch (error) {
    console.log('Error writing to file ==>', error)
  }
}
