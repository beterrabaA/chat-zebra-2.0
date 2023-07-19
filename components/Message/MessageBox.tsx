import { IMessage } from '@/types'
import Link from 'next/link'

const MessageBox = ({ name, message }: IMessage) => {
  return (
    <div>
      <div
        className={`messages__item messages__item--${
          name === 'zebra' ? 'visitor' : 'operator'
        }`}
      >
        {message}
      </div>
      {name === 'zebra' && message.includes('loan') ? (
        <div className="flex w-[250px] flex-col rounded-xl bg-gray-100 py-2 font-semibold text-blue-400">
          <Link href="/more">Do you want to apply for a loan?</Link>
          <Link href="/conditions">Loan conditions</Link>
          <Link href="/help">Help</Link>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  )
}

export default MessageBox
