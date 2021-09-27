import { gql } from "apollo-server-core";

export default gql`
  type Query {
    movies: [Movie]
    movie(id: Int): Movie
  }

  type Movie {
    id: Int
    title: String
    year: Int
    genre: String
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, title: String, year: Int, genre: String): Movie
  }
`;
