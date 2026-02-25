import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { clinicId: string } }
) {
  try {
    const { clinicId } = params

    const entries = await prisma.queueEntry.findMany({
      where: {
        clinicId,
        status: { in: ['waiting', 'ready', 'in-progress'] }
      },
      orderBy: [
        { priority: 'desc' },
        { checkInTime: 'asc' }
      ],
      include: {
        clinic: {
          select: {
            name: true,
            address: true
          }
        }
      }
    })

    const now = new Date()
    const entriesWithWait = entries.map(entry => {
      const waitMinutes = Math.floor(
        (now.getTime() - new Date(entry.checkInTime).getTime()) / 60000
      )
      return {
        ...entry,
        actualWaitMinutes: waitMinutes
      }
    })

    return NextResponse.json(entriesWithWait)
  } catch (error) {
    console.error('Error fetching queue:', error)
    return NextResponse.json({ error: 'Failed to fetch queue' }, { status: 500 })
  }
}
