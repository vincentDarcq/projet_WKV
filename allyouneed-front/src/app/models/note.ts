import { Movie } from './movie';
import { User } from './user';

export class Note {

    id: Number;
    note: number;
    movie: Movie;
    user: User;

    constructor(note?: number, movie?: Movie, user?: User){
        this.note = note;
        this.movie = movie;
        this.user = user;
    }
}