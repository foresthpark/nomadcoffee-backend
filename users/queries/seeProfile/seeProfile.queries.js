import client from "../../../client";

export default {
  Query: {
    seeProfile: async (_, { username }) => {
      const user = await client.user.findUnique({
        where: {
          username,
        },
      });

      return user;
    },
  },
};
