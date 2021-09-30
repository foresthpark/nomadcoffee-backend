import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    password: String!
    name: String!
    location: String
    avatarUrl: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!
  }

  interface Success {
    ok: Boolean!
    error: String
  }
`;
