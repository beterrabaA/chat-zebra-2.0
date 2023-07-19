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

export interface IChatUser {
  name: string
  username: string
  password: string
}
