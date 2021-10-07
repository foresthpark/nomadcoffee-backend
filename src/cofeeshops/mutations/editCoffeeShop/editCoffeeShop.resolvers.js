import { protectedResolver } from "../../../users/user.utilities";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, photos, categories },
        { loggedInUser, client }
      ) => {
        const coffeeShop = await client.coffeeShop.findUnique({
          where: {
            id,
          },
          include: {
            user: true,
            categories: {
              select: {
                name: true,
              },
            },
            photos: {
              select: {
                id: true,
                url: true,
              },
            },
          },
        });

        //

        let categoryObj = null;
        let disconnectCategoryObj = null;
        let photosObj = null;
        if (categories[0]) {
          categoryObj = getCategoryObj(categories);
          disconnectCategoryObj = coffeeShop.categories;
          disconnectCategoryObj = disconnectCategoryObj
            .map((value) => value.name)
            .filter((value) => !categories.includes(value))
            .map((value) => ({ name: value }));
        }
        if (photos[0]) {
          for (let i = 0; i < coffeeShop.photos.length; i++) {
            const photo = coffeeShop.photos[i];
            await client.coffeeShopPhoto.delete({
              where: {
                id: photo.id,
              },
            });
            await removeS3(photo.url);
          }
          photosObj = await getImageUrls(photos, loggedInUser);
        }
        await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            latitude,
            longitude,
            categories: {
              connectOrCreate: categoryObj,
              disconnect: disconnectCategoryObj,
            },
            ...(photosObj && {
              photos: {
                connectOrCreate: photosObj,
              },
            }),
          },
        });
        return {
          success: true,
          error: null,
        };
      }
    ),
  },
};
