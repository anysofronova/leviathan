import { PrismaClient } from '@prisma/client';
import * as GENERATOR from './generators';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  const designer = await prisma.designer.create({
    data: GENERATOR.generateDesigner(),
  });
  const goodsData = GENERATOR.generateGoodsData();
  const user = await prisma.user.create({
    data: GENERATOR.generateUser(),
  });

  await prisma.good.create({
    data: goodsData,
  });

  await prisma.good.create({
    data: goodsData,
  });

  await prisma.good.create({
    data: goodsData,
  });
  console.log({ user });
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
