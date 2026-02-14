const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing all projects...');
  try {
    const { count } = await prisma.project.deleteMany({});
    console.log(`Deleted ${count} projects.`);
  } catch (error) {
    console.error('Error deleting projects:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
