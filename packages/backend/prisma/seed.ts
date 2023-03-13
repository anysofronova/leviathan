import { PrismaClient } from '@prisma/client';
import { generateDesigner, generateGoodsData } from './generators';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  const designer = await prisma.designer.create({
    data: generateDesigner(),
  });
  const goodsData = generateGoodsData();

  for (let i = 0; i < 5; i++) {
    await prisma.good.create({
      data: goodsData,
    });
  }
  console.log({ designer });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
