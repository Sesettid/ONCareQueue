import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const existingClinics = await prisma.clinic.count();
  if (existingClinics > 0) {
    console.log('Database already seeded!');
    return;
  }

  const clinic = await prisma.clinic.create({
    data: {
      name: 'Toronto Family Clinic',
      address: '123 Healthcare Ave, Toronto, ON M5V 2T6',
      phone: '(416) 555-0123',
      email: 'info@torontofamilyclinic.ca',
      timezone: 'America/Toronto'
    }
  });

  const sampleEntries = [
    { patientName: 'John Smith', patientPhone: '416-555-1001', status: 'ready', estimatedWaitMinutes: 0 },
    { patientName: 'Sarah Johnson', patientPhone: '416-555-1002', status: 'waiting', estimatedWaitMinutes: 8 },
    { patientName: 'Michael Chen', patientPhone: '416-555-1003', status: 'waiting', estimatedWaitMinutes: 15 },
    { patientName: 'Emily Davis', patientPhone: '416-555-1004', status: 'waiting', estimatedWaitMinutes: 22 },
  ];

  for (const entry of sampleEntries) {
    await prisma.queueEntry.create({
      data: {
        clinicId: clinic.id,
        ...entry
      }
    });
  }
  console.log('Database seeded with sample data! Clinic ID:', clinic.id);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
