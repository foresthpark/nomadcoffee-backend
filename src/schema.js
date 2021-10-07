import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.{typeDefs,typeDef}.js`);
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{queries,mutations,mutation,resolver,resolvers}.js`
);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
