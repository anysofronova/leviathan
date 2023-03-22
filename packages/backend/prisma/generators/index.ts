import { faker } from '@faker-js/faker';
import { Good } from '@prisma/client';

export const generateDesigner = () => ({
  name: faker.name.fullName(),
  image: faker.image.dataUri(600, 400),
  info: faker.lorem.text(),
});

export const generateGoodsData = () => {
  const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'ONE_SIZE'];
  const CATEGORIES = [
    'MEN',
    'WOMEN',
    'KIDS',
    'ACCESSORIES',
    'POPULAR',
    'NEW_ARRIVALS',
  ];

  const generateRandomCategory = () => {
    const index = Math.floor(Math.random() * CATEGORIES.length);
    return CATEGORIES[index];
  };

  const additionalImages = [
    faker.image.food(),
    faker.image.cats(),
    faker.image.animals(),
    faker.image.fashion(),
  ];

  const generateRandomColors = count => {
    return Array.from({ length: count }, () => faker.color.human());
  };

  const generateRandomNumberString = () => {
    const randomNumber = faker.datatype.number({ max: 100 });
    return randomNumber.toString();
  };

  return {
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    productImage:
      additionalImages[Math.floor(Math.random() * additionalImages.length)],
    additionalImages,
    price: generateRandomNumberString(),
    name: faker.lorem.words(2),
    description: faker.lorem.text(),
    details: faker.lorem.text(),
    care: faker.lorem.text(),
    colors: generateRandomColors(5),
    sizes: SIZES,
    category: generateRandomCategory(),
    designerId: 1,
  } as unknown as Good;
};

export const generateUser = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(10),
  firstName: faker.commerce.productName(),
  lastName: faker.lorem.text(),
});
