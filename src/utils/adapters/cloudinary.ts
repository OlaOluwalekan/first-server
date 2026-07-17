import { v2 as cloudinary } from 'cloudinary'
import axios from 'axios'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const cloudinaryJsonFileUrl = process.env.CLOUDINARY_JSON_FILE_URL as string
const cloudinaryPublicId = process.env.CLOUDINARY_PUBLIC_ID as string

export const cloudinaryReadJson = async (): Promise<any> => {
  const { data } = await axios.get(cloudinaryJsonFileUrl)
  return data
}

export const cloudinaryWriteJson = async (newData: any): Promise<void> => {
  const newDataString = JSON.stringify(newData, null, 2)
  const base64Data = `data:application/json;base64,${Buffer.from(newDataString).toString('base64')}`

  await cloudinary.uploader.upload(base64Data, {
    public_id: cloudinaryPublicId,
    resource_type: 'raw',
    overwrite: true,
    invalidate: true,
  })
}
