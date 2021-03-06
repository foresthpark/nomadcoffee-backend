import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, password, name, ...rest },
      { client }
    ) => {
      try {
        const user = await client.user.findFirst({
          where: {
            OR: [{ email }, { username }],
          },
        });

        if (user) {
          return {
            ok: false,
            error: "User already exists",
          };
        }

        const pw = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            username,
            email,
            password: pw,
            name,
            ...rest,
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
    },
  },
};
