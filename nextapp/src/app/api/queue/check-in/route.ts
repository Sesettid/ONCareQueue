import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'

const CheckInSchema = z.object({
  clinicId: z.string().min(1),
  patientName: z.string().min(2),
  patientPhone: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  priority: z.number().optional()
})

export async function POST(request: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // RBAC: Verify user has staff or admin role
    const role = (sessionClaims?.metadata as any)?.role || (process.env.DEMO_RBAC === 'true' ? 'staff' : 'patient');
    if (role !== 'staff' && role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Requires staff privileges' }, { status: 403 });
    }

    const body = await request.json()
    const validation = CheckInSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input data', details: validation.error.format() }, { status: 400 })
    }

    const { clinicId, patientName, patientPhone, notes, priority } = validation.data

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
