import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clinicId, patientName, patientPhone, notes, priority } = body

    if (!clinicId || !patientName) {
      return NextResponse.json(
        { error: 'clinicId and patientName are required' },
        { status: 400 }
      )
    }

    // Get current queue count to estimate wait time
    const queueCount = await prisma.queueEntry.count({
      where: {
        clinicId,
        status: { in: ['waiting', 'in-progress'] }
      }
    })

    // Estimate wait time (6 minutes per patient)
    const estimatedWaitMinutes = queueCount * 6

    const entry = await prisma.queueEntry.create({
      data: {
        clinicId,
        patientName,
        patientPhone: patientPhone || null,
        notes: notes || null,
        priority: priority || 0,
        estimatedWaitMinutes,
        status: 'waiting'
      }
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('Error creating queue entry:', error)
    return NextResponse.json(
      { error: 'Failed to check in patient' },
      { status: 500 }
    )
  }
}
