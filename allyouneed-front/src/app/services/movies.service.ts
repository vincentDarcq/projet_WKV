import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { environment as ENV } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private plusieurs: number;
  private nb: number;
  private nbGenres: number;
  private present: Boolean;
  private index: Number;
  private movies : Array<Movie>;
  private moviesByExclusionSimple: Array<Movie>;
  private moviesByExclusionAvancee: Array<Movie>;
  private genres : Array<string>;
  private actors : Array<string>;
  private realisateurs : Array<string>;
  wsUrl: string;

  constructor(private httpClient: HttpClient) {
    this.movies = new Array();
    this.moviesByExclusionSimple = new Array();
    this.moviesByExclusionAvancee = new Array();
    this.genres = new Array();
    this.realisateurs = new Array();
    this.actors = new Array();
    this.wsUrl = ENV.apiUrl + '/movies';
   }

  public getMovies(): Array<Movie> {
    this.movies.splice(0, this.movies.length);
    this.httpClient.get(this.wsUrl)
      .subscribe((list: Array<Movie>) => this.movies.push(...list)
      );
    return this.movies;
  }

  public getMovie(id: Number): Movie {
    const index = this.getIndexMovie(id);
    if (index >= 0) {
      return this.movies[index];
    }
  }

  private getIndexMovie(id: Number): number {
    return this.movies.findIndex(
      (movie) => movie.id === id
    );
  }
  
  public createMovie(movie: Movie) {
      this.httpClient.post<Movie>(this.wsUrl, movie)
      .subscribe((movieFromJee) => this.movies.push(new Movie(movieFromJee.titre,
        movieFromJee.synopsis, movieFromJee.id, movieFromJee.genre, movieFromJee.casting,
        movieFromJee.realisateur, movieFromJee.cov, movieFromJee.year, movieFromJee.pegi,
        movieFromJee.avertissement))
        );
  }

  public updateMovie(movie: Movie) {
    this.httpClient.put<Movie>(this.wsUrl + `/${movie.id}`, movie)
      .subscribe((movieFromJee) => {
        const index = this.getIndexMovie(movie.id);
        if (index >= 0) {
          this.movies.splice(index, 1, new Movie(movieFromJee.titre,
            movieFromJee.synopsis, movieFromJee.id, movieFromJee.genre, movieFromJee.casting,
            movieFromJee.realisateur, movieFromJee.cov, movieFromJee.year, movieFromJee.pegi,
            movieFromJee.avertissement));
        }
      });
  }

  public getGenres(): Array<string> {
    this.genres.splice(0, this.genres.length);
    this.httpClient.get(this.wsUrl + `/genres`)
      .subscribe((list: Array<string>) => this.genres.push(...list)
      );
    return this.genres;
  } 

  public getRealisateurs(): Array<string> {
    this.httpClient.get(this.wsUrl + `/realisateurs`)
      .subscribe((list: Array<string>) => this.realisateurs.push(...list)
      );
    return this.realisateurs;
  }

  public getActors(): Array<string> {
    this.httpClient.get(this.wsUrl + `/acteurs`)
    .subscribe((list: Array<string>) => this.actors.push(...list)
    );
    return this.actors;
  }

  public getMovieByExclusionGenres(genres: Array<String>): Array<Movie> {
    this.moviesByExclusionSimple.splice(0, this.moviesByExclusionSimple.length);
    for(let movie of this.movies) {
      this.present = false;
      for(let genre of genres) {
        if(JSON.stringify(movie.genre) != "") {
          this.index = movie.genre.toLowerCase().indexOf(genre.toLowerCase());
          if(this.index != -1) {
            this.present = true;
          }
        }				
      }
      if(!this.present) {
        this.moviesByExclusionSimple.push(movie);
      }
    }
    return this.moviesByExclusionSimple;
  }
   
}
