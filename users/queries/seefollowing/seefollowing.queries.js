import client from "../../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      try {
        const user = await client.user.findUnique({
          where: {
            username,
          },
          select: {
            id: true,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const following = await client.user
          .findUnique({
            where: {
              username,
            },
          })
          .following({
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId } }),
          });

        return {
          ok: true,
          following,
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
