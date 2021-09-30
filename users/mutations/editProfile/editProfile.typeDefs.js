import { gql } from "apollo-server-core";

export default gql`
  type EditProfileResult implements Success {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editProfile(
      email: String
      password: String
      name: String
      location: String
      avatarUrl: String
      githubUsername: String
    ): EditProfileResult
  }
`;
