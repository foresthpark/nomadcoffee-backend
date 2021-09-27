require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { resolvers, typeDefs } from "./schema.js";

const server = new ApolloServer({
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
