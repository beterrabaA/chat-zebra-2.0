export interface IMessage {
  name: string
  message: string
}

export interface IMessageChatProps {
  conversationId: string
}

export interface IHistoryChatProps {
  title: string
  createdAt: string
}

export interface IUser {
  username: string
}
