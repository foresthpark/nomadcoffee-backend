import { gql } from "apollo-server-core";

export default gql`
  type CreateAccountResult implements Success {
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
    ): CreateAccountResult
  }
`;
