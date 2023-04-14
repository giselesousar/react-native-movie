import { Movie } from "./Movie"

export class MoviesPayload {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}