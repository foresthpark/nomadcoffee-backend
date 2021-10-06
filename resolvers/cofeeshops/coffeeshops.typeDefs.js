import { gql } from "apollo-server-core";

export default gql`
  type CoffeeShopPhoto {
    id: Int
    url: String
    shop: CoffeeShop
  }

  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String
    longitude: String
    user: User
    photos: [CoffeeShopPhoto]
    categories: [Category]
    createdAt: String
    updatedAt: String
  }

  type Category {
    id: Int
    name: String
    slug: String
    shops(lastId: Int): [CoffeeShop]
    totalShops: Int
  }
`;
