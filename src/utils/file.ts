import { v2 as cloudinary } from 'cloudinary'
import axios from 'axios'

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
const cloudinaryJsonFileUrl = process.env.CLOUDINARY_JSON_FILE_URL
const cloudinaryPublicId = process.env.CLOUDINARY_PUBLIC_ID

export const readJsonFile = async () => {
  try {
    const { data } = await axios.get(cloudinaryJsonFileUrl as string)

    return data
  } catch (error) {
    console.log('Error reading file ==>', error)
    return null
  }
}

export const writeToJsonFile = async (newData: any) => {
  try {
    const newDataString = JSON.stringify(newData, null, 2)
    const base64Data = `data:application/json;base64,${Buffer.from(newDataString).toString('base64')}`

    await cloudinary.uploader.upload(base64Data, {
      public_id: cloudinaryPublicId,
      resource_type: 'raw',
      overwrite: true,
      invalidate: true,
    })
  } catch (error) {
    console.log('Error writing to cloudinary file ==>', error)
  }
}
