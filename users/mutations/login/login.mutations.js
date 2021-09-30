import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      const user = await client.user.findUnique({
        where: { username },
      });

      if (!user) {
        return {
          ok: false,
          error: "Credentials don't exist",
        };
      }

      const { password: userPassword } = user;

      const isValid = await bcrypt.compare(password, userPassword);

      if (!isValid) {
        return {
          ok: false,
          error: "Credentials don't exist",
        };
      }

      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;

      const token = await jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "30 days",
      });

      return {
        ok: true,
        error: null,
        token,
      };
    },
  },
};
