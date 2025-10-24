import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth.js'
import { prisma } from '@/lib/db.js'
import { rateLimit } from '@/lib/rate-limit.js'
import { z } from 'zod'

const transferSchema = z.object({
  receiverEmail: z.string().email('Invalid receiver email'),
  amount: z.number().positive('Amount must be positive').max(10000, 'Amount too large'),
  description: z.string().optional(),
  type: z.enum(['P2P_TRANSFER', 'MERCHANT_PAYMENT']).default('P2P_TRANSFER'),
})

export async function POST(request) {
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

    const body = await request.json()
    const { receiverEmail, amount, description, type } = transferSchema.parse(body)

    // Find receiver
    const receiver = await prisma.user.findUnique({
      where: { email: receiverEmail },
      include: { wallet: true }
    })

    if (!receiver) {
      return NextResponse.json(
        { message: 'Receiver not found' },
        { status: 404 }
      )
    }

    if (receiver.id === session.user.id) {
      return NextResponse.json(
        { message: 'Cannot transfer to yourself' },
        { status: 400 }
      )
    }

    // Validate merchant payment
    if (type === 'MERCHANT_PAYMENT' && receiver.role !== 'MERCHANT') {
      return NextResponse.json(
        { message: 'Receiver must be a merchant for merchant payments' },
        { status: 400 }
      )
    }

    // Process transfer in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Get sender wallet with lock
      const senderWallet = await tx.wallet.findUnique({
        where: { userId: session.user.id },
      })

      if (!senderWallet) {
        throw new Error('Sender wallet not found')
      }

      if (senderWallet.balance.toNumber() < amount) {
        throw new Error('Insufficient balance')
      }

      // Get receiver wallet
      const receiverWallet = await tx.wallet.findUnique({
        where: { userId: receiver.id },
      })

      if (!receiverWallet) {
        throw new Error('Receiver wallet not found')
      }

      // Update balances
      await tx.wallet.update({
        where: { userId: session.user.id },
        data: { balance: { decrement: amount } },
      })

      await tx.wallet.update({
        where: { userId: receiver.id },
        data: { balance: { increment: amount } },
      })

      // Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          senderId: session.user.id,
          receiverId: receiver.id,
          amount,
          type,
          status: 'COMPLETED',
          description,
        },
        include: {
          sender: { select: { name: true, email: true } },
          receiver: { select: { name: true, email: true } },
        },
      })

      return transaction
    })

    return NextResponse.json({
      message: 'Transfer completed successfully',
      transaction: {
        id: result.id,
        amount: result.amount.toString(),
        type: result.type,
        status: result.status,
        description: result.description,
        sender: result.sender,
        receiver: result.receiver,
        createdAt: result.createdAt,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input', errors: error.errors },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      if (error.message === 'Insufficient balance') {
        return NextResponse.json(
          { message: 'Insufficient balance' },
          { status: 400 }
        )
      }
      if (error.message.includes('not found')) {
        return NextResponse.json(
          { message: error.message },
          { status: 404 }
        )
      }
    }

    console.error('Transfer error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
