import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    const body = await request.json()
    const { name, address, phone, email } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Clinic name is required' },
        { status: 400 }
      )
    }

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
