import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      latitude: Float
      longitude: Float
      photos: [String]
      categories: [String]
    ): Success
  }
`;
