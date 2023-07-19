import axios from 'axios'
import 'dotenv/config'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getBotResponse(message: string) {
  return await axios.post(`${API_URL}/predict`, {
    message,
  })
}

export async function sendMessage(
  message: string,
  conversationId: string,
  isBot: boolean,
) {
  return await axios.post('/api/messages', {
    message,
    conversationId,
    isBot,
  })
}

export function randomChoice(array: string[]) {
  return array[Math.floor(Math.random() * array.length)]
}
