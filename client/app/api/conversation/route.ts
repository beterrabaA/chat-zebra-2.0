import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const newConversation = await prisma.conversation.create({
      data: {},
    })
    return NextResponse.json(newConversation)
  } catch (error) {
    console.log(error, 'ERROR_CONVERSATIONS')
    return new NextResponse('Error', { status: 500 })
  }
}
