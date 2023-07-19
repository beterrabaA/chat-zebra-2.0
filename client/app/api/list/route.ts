import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const conversations = await prisma.conversation.findMany()
    return NextResponse.json(conversations)
  } catch (error) {
    console.log(error, 'ERROR_FINDALL_CONVERSATIONS')
    return new NextResponse('Error', { status: 500 })
  }
}
