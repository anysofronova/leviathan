export const usersSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        example: 1,
      },
      email: {
        type: 'string',
        example: 'test@gmail.com',
      },
      createdAt: {
        type: 'date',
        example: '2023-02-14T09:01:33.762Z',
      },
      firstName: {
        type: 'string',
        example: 'Anna',
      },
      lastName: {
        type: 'string',
        example: 'Sofronova',
      },
      role: {
        type: 'string',
        example: 'USER',
      },
      fullName: {
        type: 'string',
        example: 'Anna Sofronova',
      },
    },
  },
};
