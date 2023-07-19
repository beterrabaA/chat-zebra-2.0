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
