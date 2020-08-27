import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { environment as ENV } from '../../environments/environment';
import { Subject, Observable } from 'rxjs';

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
  private movie : Movie;
  private moviesByExclusionGenres: Array<Movie>;
  private moviesByExclusionReals: Array<Movie>;
  private moviesByExclusionActors: Array<Movie>;
  private moviesByInclusionGenres: Array<Movie>;
  private moviesByInclusionReals: Array<Movie>;
  private moviesByInclusionActors: Array<Movie>;
  private genres : Array<string>;
  private actors : Array<string>;
  private realisateurs : Array<string>;
  private wsUrl: string;
  private search = new Subject<any>();
  private alloUrl = 'http://www.omdbapi.com/?apikey=6b81888&s=inception';
  private genresSimple: Array<string> = ["Animation", "Biopic", "Comédie", "Documentaire", 
    "Drame", "Histoire", "Thriller", "Epouvante-Horreur", "Science fiction", "Aventure"];
  private genresAvance = ["Guerre", "Policier", "Jeunesse", "Fantasy", "Action",
    "Musical", "Romance", "Super Héros", "Gore", "Français"];

  constructor(private httpClient: HttpClient) {
    this.movies = new Array();
    this.movie = new Movie();
    this.moviesByExclusionGenres = new Array();
    this.moviesByExclusionReals = new Array();
    this.moviesByExclusionActors = new Array();
    this.moviesByInclusionGenres = new Array();
    this.moviesByInclusionReals = new Array();
    this.moviesByInclusionActors = new Array();
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

  public getMovieFromBack(id: Number): Movie {
    this.httpClient.get(this.wsUrl + `/${id}`)
      .subscribe((movie: Movie) => {
        this.movie = movie
      }
      );
    return this.movie;
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
        movieFromJee.synopsis, movieFromJee.genre, movieFromJee.casting,
        movieFromJee.realisateur, movieFromJee.cov, movieFromJee.year, movieFromJee.pegi,
        movieFromJee.avertissement, movieFromJee.id))
        );
  }

  public updateMovie(movie: Movie) {
    this.httpClient.put<Movie>(this.wsUrl + `/${movie.id}`, movie)
      .subscribe((movieFromJee) => {
        const index = this.getIndexMovie(movie.id);
        if (index >= 0) {
          this.movies.splice(index, 1, new Movie(movieFromJee.titre,
            movieFromJee.synopsis, movieFromJee.genre, movieFromJee.casting,
            movieFromJee.realisateur, movieFromJee.cov, movieFromJee.year, movieFromJee.pegi,
            movieFromJee.avertissement, movieFromJee.id));
        }
      });
  }

  public getAllo(){
    var newMovie
    this.httpClient.get(this.alloUrl)
    .subscribe((movie: any) => {
      console.log(movie.Search)
      //newMovie = new Movie(movie.Title, movie.Plot, this.getGenresFromApi(movie.Genre), movie.Actors, movie.Director, movie.Poster,
      //movie.Year)
      //this.createMovie(newMovie)
    })
  }

  getGenresFromApi(genre: string): string{
    var genres = ""
    while(genre.indexOf(", ") !== -1){
      if(this.genresSimple.indexOf(genre.substring(0, genre.indexOf(", "))) !== -1 || 
      this.genresAvance.indexOf(genre.substring(0, genre.indexOf(", "))) !== -1){
        if(genres !== ""){
          genres = genres + genre.substring(0, genre.indexOf(", "))
        }else {
          genres = genres + genre.substring(0, genre.indexOf(", ")) + ", "
        }
        genre = genre.substring(genre.indexOf(", ")+2)
      }else {
        genre = genre.substring(genre.indexOf(", ")+2)
      }
    }
    if(this.genresSimple.indexOf(genre) !== -1 || this.genresAvance.indexOf(genre) !== -1){
      genres = genres + genre
    }
    return genres
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
    this.moviesByExclusionGenres.splice(0, this.moviesByExclusionGenres.length);
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
        this.moviesByExclusionGenres.push(movie);
      }
    }
    return this.moviesByExclusionGenres;
  }

  public getMovieByInclusionGenres(genres: Array<String>): Array<Movie> {
    this.moviesByInclusionGenres.splice(0, this.moviesByInclusionGenres.length);
    for(let movie of this.movies) {
      this.present = false;
      for(let genre of genres) {
        if(JSON.stringify(movie.genre) != "") {
          this.index = movie.genre.toLowerCase().indexOf(genre.toLowerCase());
          if(this.index != -1) {
            this.moviesByInclusionGenres.push(movie)
          }
        }				
      }
    }
    if(genres.length >= 1){
      return this.moviesByInclusionGenres;
    }else {
      return this.movies;
    }
  }

  public getMovieByExclusionReals(reals: Array<String>): Array<Movie> {
    this.moviesByExclusionReals.splice(0, this.moviesByExclusionReals.length);
    for(let movie of this.movies) {
      this.present = false;
      for(let real of reals) {
        if(JSON.stringify(movie.realisateur) != "") {
          this.index = movie.realisateur.toLowerCase().indexOf(real.toLowerCase());
          if(this.index != -1) {
            this.present = true;
          }
        }				
      }
      if(!this.present) {
        this.moviesByExclusionReals.push(movie);
      }
    }
    return this.moviesByExclusionReals;
  }

  public getMovieByInclusionReals(reals: Array<String>): Array<Movie> {
    this.moviesByInclusionReals.splice(0, this.moviesByInclusionReals.length);
    for(let movie of this.movies) {
      for(let real of reals) {
        if(JSON.stringify(movie.realisateur) != "") {
          this.index = movie.realisateur.toLowerCase().indexOf(real.toLowerCase());
          if(this.index != -1) {
            this.moviesByInclusionReals.push(movie);
          }
        }				
      }
    }
    if(reals.length >= 1){
      return this.moviesByInclusionReals;
    }else {
      return this.movies;
    }
  }

  public getMovieByExclusionActors(actors: Array<String>): Array<Movie> {
    this.moviesByExclusionActors.splice(0, this.moviesByExclusionActors.length);
    for(let movie of this.movies) {
      this.present = false;
      for(let actor of actors) {
        if(JSON.stringify(movie.casting) != "") {
          this.index = movie.casting.toLowerCase().indexOf(actor.toLowerCase());
          if(this.index != -1) {
            this.present = true;
          }
        }				
      }
      if(!this.present) {
        this.moviesByExclusionActors.push(movie);
      }
    }
    return this.moviesByExclusionActors;
  }

  public getMovieByInclusionActors(actors: Array<String>): Array<Movie> {
    this.moviesByInclusionActors.splice(0, this.moviesByInclusionActors.length);
    for(let movie of this.movies) {
      this.present = false;
      for(let actor of actors) {
        if(JSON.stringify(movie.casting) != "") {
          this.index = movie.casting.toLowerCase().indexOf(actor.toLowerCase());
          if(this.index != -1) {
            this.moviesByInclusionActors.push(movie);
          }
        }				
      }
    }
    if(actors.length >= 1){
      return this.moviesByInclusionActors;
    }else {
      return this.movies;
    }
  }


  setSearch(search: string){
    this.search.next(search);
  }

  getSearch(): Observable<any>{
    return this.search.asObservable();
  }
   
}
