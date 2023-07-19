'user client'
import { IHistoryChatProps } from '@/types'
import { useRouter } from 'next/navigation'

const HistoryList = ({ title, createdAt }: IHistoryChatProps) => {
  const router = useRouter()
  return (
    <div
      className="mt-2 w-full rounded-xl bg-gray-400 py-3"
      onClick={() => router.push(`/history/${title}`)}
    >
      <div className="mx-3">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="font-semibold text-gray-200">{createdAt}</p>
      </div>
    </div>
  )
}

export default HistoryList
