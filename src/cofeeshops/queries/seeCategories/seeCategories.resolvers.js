export default {
  Query: {
    seeCategories: (_, { lastId }, { client }) =>
      client.category.findMany({
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
