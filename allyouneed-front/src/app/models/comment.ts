import { Movie } from './movie';
import { User } from './user';

export class Comment {

    id: Number;
    comment: string;
    date: string;
    movie: Movie;
    user: User;

    constructor(comment?: string, date?: string, movie?: Movie, user?: User){
        this.comment = comment;
        this.date = date;
        this.movie = movie;
        this.user = user;
    }
}