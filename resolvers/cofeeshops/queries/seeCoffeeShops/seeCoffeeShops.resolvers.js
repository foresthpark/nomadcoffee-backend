export default {
  Query: {
    seeCoffeeShops: (_, { lastId }) =>
      client.coffeeShop.findMany({
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: { createdAt: "desc" },
        include: {
          user: true,
          photos: true,
          categories: true,
        },
      }),
  },
};
