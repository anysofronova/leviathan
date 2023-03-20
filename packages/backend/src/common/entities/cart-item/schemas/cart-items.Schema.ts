export const cartItemsSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        example: 1,
      },
      createdAt: {
        type: 'date',
        example: '2023-02-14T09:01:33.762Z',
      },
      updatedAt: {
        type: 'date',
        example: '2023-02-14T09:01:33.762Z',
      },
      quantity: {
        type: 'number',
        example: 1,
      },
      goodId: {
        type: 'number',
        example: 3,
      },
      userId: {
        type: 'number',
        example: 4,
      },
    },
  },
};
