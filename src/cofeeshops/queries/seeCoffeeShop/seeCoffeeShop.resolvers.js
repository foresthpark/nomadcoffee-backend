export default {
  Query: {
    seeCoffeeShop: (_, { id }, { client }) =>
      client.coffeeShop.findUnique({
        where: {
          id,
        },
        include: {
          // acts like populate
          user: true,
          photos: true,
          categories: true,
        },
      }),
  },
};
