'use client'

import axios from 'axios'
import { useState, KeyboardEvent, useEffect } from 'react'
import 'dotenv/config'

import MessageBox from './MessageBox'

import { IChatUser, IMessage, IMessageChatProps } from '@/types'
import { getBotResponse, getList, sendMessage } from '@/utils'
import { messageReply } from '@/constants'

const API_URL = process.env.NEXT_PUBLIC_API_HOST

const MessageChat = ({ conversationId }: IMessageChatProps) => {
  const [messages, setMessages] = useState([] as IMessage[])
  const [message, setMessage] = useState('')
  const [botMessage, setBotMessage] = useState('')
  const [userData, setUserData] = useState({} as IChatUser)
  const [username, setUsername] = useState(false)
  const [password, setPassword] = useState(false)
  const [name, setName] = useState(false)
  const [isRegistred, setIsRegistred] = useState(false)
  const [isRegistring, setIsRegistring] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [finishDate, setFinishDate] = useState('' as string)
  const [lastMsg, setLastMsg] = useState('' as string)

  const handleMessagesState = async () => {
    setLastMsg(message)
    if (isRegistring) {
      if (password) {
        setUserData({ ...userData, password: message })
      } else if (name) {
        setUserData({ ...userData, name: message })
      } else if (username) {
        setMessages([...messages, messageReply[1]])
        setUserData({ ...userData, username: message })
      }
      setMessages([...messages, { name: 'user', message }])
      setMessage('')
      await sendMessage(message, conversationId, false)
    } else {
      setMessages([...messages, { name: 'user', message }])
      setMessage('')
      await sendMessage(message, conversationId, false)

      const {
        data: { answer },
      } = await getBotResponse(message)

      if (isRegistred) {
        setBotMessage(answer)
      } else {
        setIsRegistring(true)
        setUsername(true)
        setBotMessage(messageReply[0].message)
      }
    }
  }

  const login = async () => {
    await axios.post('/api/register', userData)
  }

  const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await handleMessagesState()
    }
  }

  const handleClick = async () => {
    await handleMessagesState()
  }

  const handleDowlonad = async () => {
    setIsDownloading(true)
    const list = await getList(conversationId)
    const valor = {
      data: list,
    }
    const response = await axios.post(`${API_URL}/upload`, valor)
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute(
      'download',
      `Conversation ${userData.username}_${finishDate}.csv`,
    )
    document.body.appendChild(link)
    link.click()
    setIsDownloading(false)
  }

  useEffect(() => {
    if (botMessage) {
      setMessages([...messages, { name: 'zebra', message: botMessage }])
      sendMessage(botMessage, conversationId, true)
      setBotMessage('')
    }
  }, [botMessage])

  useEffect(() => {
    if (username && userData.username) {
      setBotMessage(messageReply[1].message)
      setPassword(true)
      setUsername(false)
    }
  }, [username, userData.username])

  useEffect(() => {
    if (password && userData.password) {
      setBotMessage(messageReply[2].message)
      setName(true)
      setPassword(false)
    }
  }, [password, userData.password])

  useEffect(() => {
    if (name && userData.name) {
      setName(false)
      setBotMessage(messageReply[5].message)

      setIsRegistring(false)
      login()
      setIsRegistred(true)
    }
  }, [name, userData.name])

  useEffect(() => {
    if (lastMsg === 'Goodbye') {
      const now = new Date()
      const formattedDate = `${now.getDate()}/${
        now.getMonth() + 1
      }/${now.getFullYear()}_${now.getHours()}:${now.getMinutes()}`
      setFinishDate(formattedDate)
    }
  }, [lastMsg])

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
      {messages.slice().map((item: IMessage, i) => (
        <MessageBox
          key={item.message + i + item.name}
          name={item.name}
          message={item.message}
        />
      ))}
      {finishDate !== '' ? (
        <ChatDownloadFooter />
      ) : (
        <div className="chatbox__footer">
          <input
            type="text"
            placeholder="Write a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyUp={(event) => handleKeyPress(event)}
          />
          <button
            className="chatbox__send--footer send__button"
            onClick={() => handleClick()}
          >
            Send
          </button>
        </div>
      )}
    </div>
  )
}

export default MessageChat
