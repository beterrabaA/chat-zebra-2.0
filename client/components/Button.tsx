'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Loading from './Loading'
import { useState } from 'react'

const Button = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    const { data } = await axios.post('/api/conversation', {})
    router.push(`/conversation/${data.id}`)
  }
  return (
    <div className="my-6 flex w-full">
      <button
        type="button"
        onClick={() => handleClick()}
        className="w-full rounded-full bg-gray-400 py-[16px] text-white"
      >
        {isLoading ? <Loading /> : 'Start Chat with Zebra'}
      </button>
    </div>
  )
}

export default Button
