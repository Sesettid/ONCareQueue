import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const ClinicSchema = z.object({
  name: z.string().min(2),
  address: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional().or(z.literal(''))
})

export async function GET() {
  try {
    const clinics = await prisma.clinic.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(clinics)
  } catch (error) {
    console.error('Error fetching clinics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clinics' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const role = (sessionClaims?.metadata as any)?.role || (process.env.DEMO_RBAC === 'true' ? 'staff' : 'patient');
    if (role !== 'staff' && role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json()
    const validation = ClinicSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input data', details: validation.error.format() }, { status: 400 })
    }

    const { name, address, phone, email } = validation.data

    const clinic = await prisma.clinic.create({
      data: {
        name,
        address: address || null,
        phone: phone || null,
        email: email || null
      }
    })

    return NextResponse.json(clinic, { status: 201 })
  } catch (error) {
    console.error('Error creating clinic:', error)
    return NextResponse.json(
      { error: 'Failed to create clinic' },
      { status: 500 }
    )
  }
}
