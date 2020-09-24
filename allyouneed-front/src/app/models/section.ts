import { Movie } from './movie';

export class Section {
    
    movies: Array<Movie>

    constructor(movies?: Array<Movie>){
        this.movies = movies
    }
}