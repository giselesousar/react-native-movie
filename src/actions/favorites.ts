import { Movie } from "../models";

const FAVORITE_MOVIE = 'FAVORITE_MOVIE';

export const favoriteMovie = (username: string, movie: Movie) => ({
    type: FAVORITE_MOVIE,
    username,
    movie
});