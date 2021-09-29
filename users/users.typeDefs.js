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

  type Updated {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
      name: String!
      location: String
      avatarUrl: String
      githubUsername: String
    ): Updated
  }

  type Query {
    getUserById(username: String!): User
  }
`;
