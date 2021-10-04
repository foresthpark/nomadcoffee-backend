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
    following: [User]
    followers: [User]
    createdAt: String!
    updatedAt: String!
    totalFollowers: Int!
    totalFollowing: Int!
    isFollowing: Boolean!
    isMe: Boolean!
    isFollowingUser: Boolean!
  }

  interface Success {
    ok: Boolean!
    error: String
  }
`;
