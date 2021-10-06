import { gql } from "apollo-server-core";

export default gql`
  type UnfollowUserResult implements Success {
    ok: Boolean!
    error: String
  }

  type Mutation {
    unfollowUser(username: String!): UnfollowUserResult!
  }
`;
