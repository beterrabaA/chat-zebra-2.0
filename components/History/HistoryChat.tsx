'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import HistoryList from './HistoryList'

const HistoryChat = () => {
  const [conversationList, setConversationList] = useState(
    [] as { id: string; createdAt: string }[],
  )
  const [isLoading, setIsLoading] = useState(false)
  const listados = async () => {
    setIsLoading(true)
    const lista = await axios.get('/api/list')
    setConversationList(lista.data)
    setIsLoading(false)
  }

  useEffect(() => {
    listados()
  }, [])
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {conversationList.map((item) => (
        <HistoryList key={item.id} title={item.id} createdAt={item.createdAt} />
      ))}
    </div>
  )
}

export default HistoryChat
