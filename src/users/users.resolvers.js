import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }, _, { client }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }, _, { client }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) return false;
      return loggedInUser.id === id;
    },
    isFollowing: async ({ id }, args, { loggedInUser, client }) => {
      if (!loggedInUser) return false;

      const exists = await client.user
        .findUnique({
          where: {
            username: loggedInUser.username,
          },
        })
        .following({
          where: {
            id,
          },
        });

      return exists.length !== 0;
    },
  },
};
