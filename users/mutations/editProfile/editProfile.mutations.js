import bcrypt from "bcrypt";
import { protectdResolver } from "../../user.utilities";

export default {
  Mutation: {
    editProfile: protectdResolver(
      async (
        _,
        {
          email,
          name,
          location,
          avatarUrl,
          githubUsername,
          password: newPassword,
        },
        { loggedInUser, client }
      ) => {
        let pw = null;
        if (newPassword) {
          pw = await bcrypt.hash(newPassword, 10);
        }

        try {
          await client.user.update({
            where: {
              id: loggedInUser?.id,
            },
            data: {
              email,
              name,
              location,
              avatarUrl,
              githubUsername,
              ...(newPassword && { password: pw }),
            },
          });

          return {
            ok: true,
            error: null,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      }
    ),
  },
};
