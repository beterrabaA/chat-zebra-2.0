import bcrypt from 'bcrypt'

import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, username, password } = body

  const hashedPwd = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      name,
      username,
      hashedPwd,
    },
  })

  return NextResponse.json(user)
}
