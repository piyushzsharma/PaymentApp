import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth.js'
import { prisma } from '@/lib/db.js'
import { rateLimit } from '@/lib/rate-limit.js'

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    const isAllowed = await rateLimit(clientIP)
    
    if (!isAllowed) {
      return NextResponse.json(
        { message: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id },
    })

    if (!wallet) {
      return NextResponse.json(
        { message: 'Wallet not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      balance: wallet.balance.toString(),
      updatedAt: wallet.updatedAt,
    })
  } catch (error) {
    console.error('Balance fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
