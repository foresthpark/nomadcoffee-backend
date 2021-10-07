export default {
  Query: {
    seeCategory: (_, { id }, { client }) =>
      client.category.findUnique({
        where: {
          id,
        },
      }),
  },
};
