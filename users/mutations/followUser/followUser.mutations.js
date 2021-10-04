import client from "../../../client";
import { protectedResolver } from "../../user.utilities";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      try {
        const user = await client.user.findUnique({ where: { username } });

        if (!user) {
          throw new Error("User not found");
        }

        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: {
                username: username,
              },
            },
          },
        });

        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    }),
  },
};
