export default {
  CoffeeShop: {
    categories: ({ id }, { lastId }, { client }) =>
      client.coffeeShop
        .findUnique({
          where: { id },
        })
        .categories({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
  Category: {
    shops: ({ id }, { lastId }, { client }) =>
      client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
    totalShops: ({ id }, { client }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
