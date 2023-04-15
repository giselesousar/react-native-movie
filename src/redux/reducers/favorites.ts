import { Movie } from "../../models";

const INITIAL_STATE: { favorites: { username: string; movies: Movie[] }[] } = {
    favorites: [],
}

type IAction = {
    type: string;
    movie: Movie
    username: string;
}

export default (state = INITIAL_STATE, action: IAction) => {
    switch (action.type) {
        case 'FAVORITE_MOVIE':
            const user = state.favorites.find((favorite) => favorite.username === action.username);
            if (!user) {
                return {
                    favorites: [...state.favorites, { username: action.username, movies: [action.movie] }]
                };
            }
            const filtered = user.movies.filter((movie: Movie) => movie.id !== action.movie?.id)
            return {
                favorites: state.favorites.map(favorite =>
                    favorite.username === action.username
                        ? {
                            ...favorite, movies: filtered.length < favorite.movies.length
                                ? filtered
                                : [...favorite.movies, action.movie]
                        }
                        : favorite)
            };
        default:
            return state;
    }
}