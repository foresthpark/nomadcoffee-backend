import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowersQuery implements Success {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }

  type Query {
    seeFollowers(username: String!, page: Int): SeeFollowersQuery!
  }
`;
