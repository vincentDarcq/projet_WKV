import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from '../models/user';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, DoCheck {

  private user: User;
  private movies: Array<Movie>;
  private favoris: Array<Movie>;
  favorisFilled: boolean = false;

  constructor(private movieService: MoviesService) { 
    this.user = new User();
    this.movies = new Array();
    this.favoris = new Array();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    this.movies = this.movieService.getMovies()
  }

  ngDoCheck(){
    if(this.movies.length > 0 && !this.favorisFilled){
      this.favorisStringToMovie()
      this.favorisFilled = true;
    }
  }

  favorisStringToMovie(){
    for(let movie of this.movies){
      if(this.user.filmsfavoris.indexOf(movie.titre) !== -1){
        this.favoris.push(movie)
      }
    }
  }

}
