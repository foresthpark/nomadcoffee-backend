import { gql } from "apollo-server-core";

export default gql`
  type LoginResult implements Success {
    ok: Boolean!
    error: String
    token: String
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult
  }
`;
