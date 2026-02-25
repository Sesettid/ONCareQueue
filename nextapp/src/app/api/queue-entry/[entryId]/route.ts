import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

import { auth } from '@clerk/nextjs/server'

export async function PATCH(
  request: NextRequest,
  context: any
) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const role = (sessionClaims?.metadata as any)?.role || (process.env.DEMO_RBAC === 'true' ? 'staff' : 'patient');
    if (role !== 'staff' && role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { entryId } = await context.params
    const body = await request.json()
    const { status, notes } = body

    const validStatuses = ['waiting', 'ready', 'in-progress', 'completed', 'no-show']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const entry = await prisma.queueEntry.update({
      where: { id: entryId },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes })
      }
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error('Error updating queue entry:', error)
    return NextResponse.json({ error: 'Failed to update entry' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: any
) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const role = (sessionClaims?.metadata as any)?.role || (process.env.DEMO_RBAC === 'true' ? 'staff' : 'patient');
    if (role !== 'staff' && role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { entryId } = await context.params
    await prisma.queueEntry.delete({ where: { id: entryId } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting queue entry:', error)
    return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 })
  }
}
