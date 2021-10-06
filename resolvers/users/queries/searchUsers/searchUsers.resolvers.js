export default {
  Query: {
    searchUsers: async (_, { keyword, lastId }, { client }) => {
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      return users;
    },
  },
};
