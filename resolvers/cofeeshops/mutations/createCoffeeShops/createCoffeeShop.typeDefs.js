import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: Float
      longitude: Float
      photos: [String]
      categories: [String]
    ): CoffeeShop
  }
`;
