'use client'

import axios from 'axios'
import 'dotenv/config'
import { useEffect, useState } from 'react'

import MessageBox from '@/components/Message/MessageBox'

import { IConversationMessage, historyConversationProps } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_HOST

const HistoryMessage = ({ params }: { params: historyConversationProps }) => {
  const [conversationList, setConversationList] = useState([])
  const [isDownloading, setIsDownloading] = useState(false)

  const getList = async () => {
    const bodyData = {
      conversationId: params.historyConversation,
    }
    const { data } = await axios.post('/api/messages/list', bodyData)
    setConversationList(data)
  }

  const handleDowlonad = async () => {
    setIsDownloading(true)
    const valor = {
      data: conversationList,
    }

    const response = await axios.post(`${API_URL}/upload`, valor)
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${params.historyConversation}.csv`)
    document.body.appendChild(link)
    link.click()
    setIsDownloading(false)
  }

  const ChatDownloadFooter = () => (
    <button
      type="button"
      onClick={() => handleDowlonad()}
      className="absolute bottom-0 z-10 mx-0 w-full rounded-full bg-gray-400 py-4 text-xl font-semibold text-white"
    >
      {isDownloading ? 'Downloading...' : 'Download this conversation'}
    </button>
  )

  return (
    <div>
      {conversationList.map((item: IConversationMessage) => (
        <MessageBox
          key={item.id}
          name={item.isBot ? 'zebra' : 'user'}
          message={item.body}
        />
      ))}
      <ChatDownloadFooter />
    </div>
  )
}

export default HistoryMessage
