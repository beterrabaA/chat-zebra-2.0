import { NextResponse } from 'next/server'

import prisma from '@/lib/prismadb'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, conversationId, isBot } = body

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        conversation: {
          connect: { id: conversationId },
        },
        isBot,
      },
    })

    return NextResponse.json(newMessage)
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES')
    return new NextResponse('Error', { status: 500 })
  }
}
