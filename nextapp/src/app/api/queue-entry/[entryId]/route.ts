import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { entryId: string } }
) {
  try {
    const { entryId } = params
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
  { params }: { params: { entryId: string } }
) {
  try {
    const { entryId } = params
    await prisma.queueEntry.delete({ where: { id: entryId } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting queue entry:', error)
    return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 })
  }
}
