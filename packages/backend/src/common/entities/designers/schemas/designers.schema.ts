export const designersSchema = {
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
      name: {
        type: 'string',
        example: 'Anna Sofronova',
      },
      image: {
        type: 'string',
        example: 'image.png',
      },
      info: {
        type: 'string',
        example: 'Some info about Anna Sofronova',
      },
    },
  },
};
