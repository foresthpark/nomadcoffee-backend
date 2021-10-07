export default {
  Query: {
    seeFollowers: async (_, { username, page }, { client }) => {
      try {
        const user = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });

        if (!user) {
          throw new Error("User not found");
        }

        // NOTE: Find the user and then fond the followers on the user object
        const followers = await client.user
          .findUnique({ where: { username } })
          .followers({
            take: 5,
            skip: (page - 1) * 5,
          });

        // NOTE: Find users that are following username
        // const bFollowers = await client.user.findMany({
        //   where: {
        //     following: {
        //       some: { username },
        //     },
        //   },
        // });

        const totalFollowers = await client.user.count({
          where: {
            following: {
              some: { username },
            },
          },
        });

        return {
          ok: true,
          followers,
          totalPages: Math.ceil(totalFollowers / 5),
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    },
  },
};
