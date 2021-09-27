import client from "../client";

export default {
  Mutation: {
    createMovie: (_, { title, year, genre }) => {
      return client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      });
    },
    deleteMovie: (_, { id }) => client.movie.delete({ where: { id } }),
    updateMovie: (_, { id, title, year, genre }) =>
      client.movie.update({
        where: { id },
        data: {
          title,
        },
      }),
  },
};
