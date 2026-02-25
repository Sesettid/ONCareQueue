const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:Hellodinusvs%4097@db.qaydrtkysahgrthzdubs.supabase.co:5432/postgres"
    }
  }
});

async function test() {
  try {
    console.log("Attempting to connect...");
    const clinics = await prisma.clinic.findMany();
    console.log("SUCCESS! Found clinics:", clinics.length);
  } catch (error) {
    console.error("FAILED TO CONNECT:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();