import { protectedResolver } from "../../../users/user.utilities";
import slug from "slug";
import { createWriteStream } from "fs";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos: shopPhotos, categories },
        { loggedInUser },
        { client }
      ) => {
        let categoriesObjs = null;
        if (categories) {
          categoriesObjs = categories.map((category) => ({
            where: { name: category },
            create: { name: category, slug: slug(category) },
          }));
        }
        let photos = [];
        if (shopPhotos) {
          shopPhotos.forEach(async (photo) => {
            const { createReadStream, filename } = await photo;
            const newFilename = `${name}-${Date.now()}-${filename}`;
            const readStream = await createReadStream(
              `${process.cwd()}/uploads/${newFilename}`
            );
            const writeStream = createWriteStream(
              `${process.cwd()}/uploads/${newFilename}`
            );
            readStream.pipe(writeStream);
            photo = `http://localhost:4000/:4000/static/${newFilename}`;
            photos.push(photo);
          });
        }

        return await client.coffeeShop.create({
          data: {
            name,
            user: {
              connect: {
                id: loggedInUser?.id,
              },
            },
            ...(categoriesObjs.length > 0 && {
              categories: { connectOrCreate: categoriesObjs },
            }),
            ...(latitude && latitude),
            ...(longitude && longitude),
            ...(photos && photos),
          },
        });
      }
    ),
  },
};
