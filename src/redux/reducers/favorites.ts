import { Movie } from "../../models";

const INITIAL_STATE = {
    movies: [],
}

type IAction = {
    type: string;
    movie: Movie
}

export default (state = INITIAL_STATE, action: IAction) => {
    switch (action.type) {
        case 'FAVORITE_MOVIE':
            const filtered = state.movies.filter((movie: Movie) => movie.id !== action.movie.id)
            return {
                movies: filtered.length < state.movies.length ? filtered : [...state.movies, action.movie]
            };
        default:
            return state;
    }
}