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

export async function downloadConversation() {
  const response = await axios.get(`${API_URL}/download`)
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'file.csv')
  document.body.appendChild(link)
  link.click()
}
