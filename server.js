require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import client from "./client.js";
import { resolvers, typeDefs } from "./schema.js";
import { getUser } from "./users/user.utilities.js";

const server = new ApolloServer({
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req?.headers?.token),
      client,
    };
  },
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const PORT = process.env.PORT;

server
  .listen()
  .then(() =>
    console.log(`🚀🚀🚀🚀 Server ready at http://localhost:${PORT} 🚀🚀🚀🚀`)
  );
