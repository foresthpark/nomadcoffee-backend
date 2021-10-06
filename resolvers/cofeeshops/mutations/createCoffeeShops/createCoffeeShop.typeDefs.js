import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: Float
      longitude: Float
      photos: [Upload]
      categories: [String]
    ): CoffeeShop
  }
`;
