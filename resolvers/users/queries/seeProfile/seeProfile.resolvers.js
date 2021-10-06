export default {
  Query: {
    seeProfile: async (_, { username }, { client }) => {
      const user = await client.user.findUnique({
        where: {
          username,
        },
        include: {
          following: true,
          followers: true,
        },
      });

      return user;
    },
  },
};
