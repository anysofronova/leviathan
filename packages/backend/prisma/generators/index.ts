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
    [
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-t-shirt-0.png%3Fv%3D1622902418&w=640&q=85',
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-t-shirt-4.png%3Fv%3D1622902418&w=640&q=85',
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-t-shirt-3.png%3Fv%3D1622902418&w=640&q=85',
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-t-shirt-2.png%3Fv%3D1622902418&w=640&q=85',
    ],
    [
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fbomber-jacket-0.png%3Fv%3D1622902777&w=640&q=85',
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fbomber-jacket-1.png%3Fv%3D1622902777&w=640&q=85',
    ],
    [
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FFront-NoModel_ec3be051-d579-4c03-b55b-64449d0b0445.png%3Fv%3D1623255893&w=640&q=85',
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FFrontZoom_6302485d-7f7f-4585-b27b-aea85b7d644a.png%3Fv%3D1623255894&w=640&q=85',
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FFront_c81c04e9-333a-4a6c-b91a-e898f2a6025b.png%3Fv%3D1623255894&w=640&q=85',
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FSide_748811db-ccd1-48c7-9dcd-64ec2ec88993.png%3Fv%3D1623255894&w=640&q=85',
    ],
    [
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FCup-front-black.png%3Fv%3D1623159405&w=640&q=85',
    ],
    [
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-0.png%3Fv%3D1622901991&w=640&q=85',
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-1.png%3Fv%3D1622901991&w=640&q=85',
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-2.png%3Fv%3D1622901991&w=640&q=85',
      'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2Fshort-sleeve-3.png%3Fv%3D1622901991&w=640&q=85',
    ],
  ];

  const additionalImageIndex = Math.floor(
    Math.random() * additionalImages.length,
  );
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
    productImage: additionalImages[additionalImageIndex][additionalImageIndex],
    additionalImages: additionalImages[additionalImageIndex],
    price: generateRandomNumberString(),
    name: faker.lorem.words(2),
    description: faker.lorem.text(),
    details: faker.lorem.text(),
    care: faker.lorem.text(),
    colors: generateRandomColors(4),
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
