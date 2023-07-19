import axios from 'axios'
import 'dotenv/config'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getBotResponse(message: string) {
  return await axios.post(`${API_URL}/predict`, {
    message,
  })
}
