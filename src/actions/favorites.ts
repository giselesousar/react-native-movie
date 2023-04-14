import { Movie } from "../models";

const FAVORITE_MOVIE = 'FAVORITE_MOVIE';

export const favoriteMovie = (movie: Movie) => ({
    type: FAVORITE_MOVIE,
    movie
});