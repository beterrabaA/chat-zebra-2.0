import { NextResponse } from 'next/server'

import prisma from '@/lib/prismadb'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { conversationId } = body
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    return NextResponse.json(messages)
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES')
    return new NextResponse('Error', { status: 500 })
  }
}
