require("dotenv").config();
import regeneratorRuntime from "regenerator-runtime";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import client from "./client.js";
import { resolvers, typeDefs } from "./schema.js";
import { getUser } from "./users/user.utilities";
const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req?.headers?.token),
      client,
    };
  },
  resolvers,
  typeDefs,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
  .listen()
  .then(() =>
    console.log(`🚀🚀🚀🚀 Server ready at http://localhost:${PORT} 🚀🚀🚀🚀`)
  );
