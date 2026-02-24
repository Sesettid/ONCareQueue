import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Check if clinics already exist
    const existingClinics = await prisma.clinic.count()
    if (existingClinics > 0) {
      return NextResponse.json({ message: 'Database already seeded' })
    }

    // Create default clinic
    const clinic = await prisma.clinic.create({
      data: {
        name: 'Toronto Family Clinic',
        address: '123 Healthcare Ave, Toronto, ON M5V 2T6',
        phone: '(416) 555-0123',
        email: 'info@torontofamilyclinic.ca',
        timezone: 'America/Toronto'
      }
    })

    // Add some sample queue entries
    const sampleEntries = [
      { patientName: 'John Smith', patientPhone: '416-555-1001', status: 'ready', estimatedWaitMinutes: 0 },
      { patientName: 'Sarah Johnson', patientPhone: '416-555-1002', status: 'waiting', estimatedWaitMinutes: 8 },
      { patientName: 'Michael Chen', patientPhone: '416-555-1003', status: 'waiting', estimatedWaitMinutes: 15 },
      { patientName: 'Emily Davis', patientPhone: '416-555-1004', status: 'waiting', estimatedWaitMinutes: 22 },
    ]

    for (const entry of sampleEntries) {
      await prisma.queueEntry.create({
        data: {
          clinicId: clinic.id,
          ...entry
        }
      })
    }

    return NextResponse.json({ 
      success: true, 
      clinicId: clinic.id,
      message: 'Database seeded with sample data'
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}
