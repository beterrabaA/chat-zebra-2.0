import MessageChat from '@/components/Message/MessageChat'
import { IMessageChatProps } from '@/types'

const page = ({ params }: { params: IMessageChatProps }) => {
  return (
    <div>
      <MessageChat conversationId={params.conversationId} />
    </div>
  )
}

export default page
