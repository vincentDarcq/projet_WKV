import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { environment as ENV } from '../../environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private movies : Array<Movie>;
  private genres : Array<string>;
  private actors : Array<string>;
  private tenActors : Array<string>;
  private tenReals : Array<string>;
  private realisateurs : Array<string>;
  private wsUrl: string;
  private search = new Subject<any>();
  private IMDBApi = 'http://www.omdbapi.com/?apikey=6b81888&s=inception';
  private genresSimple: Array<string> = ["animation", "biopic", "comédie", "documentaire", 
    "drame", "histoire", "thriller", "epouvante-Horreur", "science fiction", "aventure"];
  private genresAvance: Array<string>;


  constructor(private httpClient: HttpClient) {
    this.wsUrl = ENV.apiUrl + '/movies';
   }

  public getMovies(): Array<Movie> {
    this.movies = new Array()
    this.httpClient.get(this.wsUrl)
      .subscribe((list: Array<Movie>) =>
        this.movies.push(...list)
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
    console.log("movies = "+this.movies)
    return this.movies.findIndex(
      (movie) => movie.id === id
    );
  }
  
  public createMovie(movie: Movie) {
      this.httpClient.post<Movie>(this.wsUrl, movie)
      .subscribe((movieFromJee) => this.movies.push(new Movie(movieFromJee.titre,
        movieFromJee.synopsis, movieFromJee.genre, movieFromJee.casting,
        movieFromJee.realisateur, movieFromJee.cov_verticale, movieFromJee.cov_horizontale,
        movie.time, movieFromJee.year, movieFromJee.pegi, movieFromJee.avertissement, movieFromJee.id))
        );
  }

  public updateMovie(movie: Movie) {
    this.httpClient.put<Movie>(this.wsUrl + `/${movie.id}`, movie)
      .subscribe((movieFromJee) => {
        const index = this.getIndexMovie(movie.id);
        if (index >= 0) {
          this.movies.splice(index, 1, new Movie(movieFromJee.titre,
            movieFromJee.synopsis, movieFromJee.genre, movieFromJee.casting,
            movieFromJee.realisateur, movieFromJee.cov_verticale, movieFromJee.cov_horizontale,
            movie.time, movieFromJee.year, movieFromJee.pegi, movieFromJee.avertissement, movieFromJee.id));
        }
      });
  }

  public getApi(){
    var newMovie
    this.httpClient.get(this.IMDBApi)
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

  public getGenres(): Array<string>{
    this.genres = new Array()
    this.httpClient.get(this.wsUrl + `/genres`)
      .subscribe((list: Array<string>) => {
        this.genres.push(...list)
      });
      return this.genres
  } 

  public getGenresAvances(): Array<string> {
    this.genresAvance = new Array()
    for(let genre of this.genres){
      if(this.genresSimple.indexOf(genre) === -1){
        genre = genre[0].toUpperCase()+genre.substring(1)
        this.genresAvance.push(genre)
      }
    }
    return this.genresAvance
  }

  public getRealisateurs(): Array<string> {
    this.realisateurs = new Array()
    this.httpClient.get(this.wsUrl + `/realisateurs`)
      .subscribe((list: Array<string>) => this.realisateurs.push(...list)
      );
    return this.realisateurs;
  }

  public getActors(): Array<string> {
    this.actors = new Array()
    this.httpClient.get(this.wsUrl + `/acteurs`)
    .subscribe((list: Array<string>) => this.actors.push(...list)
    );
    return this.actors;
  }

  public getTenActors(): Array<string> {
    this.tenActors = new Array()
    this.httpClient.get(this.wsUrl + `/tenActeurs`)
    .subscribe((list: Array<string>) => {
      this.tenActors.push(...list)
    });
    return this.tenActors;
  }

  public getTenReals(): Array<string> {
    this.tenReals = new Array()
    this.httpClient.get(this.wsUrl + `/tenRealisateurs`)
    .subscribe((list: Array<string>) => {
      this.tenReals.push(...list)
    });
    return this.tenReals;
  }

  private getMoviesAlreadyExcluded(oldMovies: Array<Movie>, movies: Array<Movie>){
    let moviesExcluded = new Array()
    for(let movie of oldMovies){
      if(movies.indexOf(movie) === -1){
        moviesExcluded.push(movie)
      }
    }
    return moviesExcluded
  }

  public getMovieByExclusionGenres(oldMovies: Array<Movie>, movies: Array<Movie>, genresS: Array<string>, genresA: Array<string>, realisateurs: Array<string>, acteurs: Array<string>): Array<Movie> {
    let genres = new Array()
    for(let genre of genresS){
      genres.push(genre)
    }
    for(let genre of genresA){
      genres.push(genre)
    }
    let moviesByExclusionGenres = new Array<Movie>()
    for(let movie of oldMovies) {
      let present = false;
      for(let genre of genres) {
        if(JSON.stringify(movie.genre) != "") {
          let index = movie.genre.toLowerCase().indexOf(genre.toLowerCase());
          if(index != -1) {
            present = true;
          }
        }				
      }
      if(!present) {
        moviesByExclusionGenres.push(movie);
      }
    }
    for(let movie of this.getMoviesAlreadyExcluded(oldMovies, movies)){
      if(moviesByExclusionGenres.indexOf(movie) !== -1){
        for(let genre of genres){
          if(movie.genre.toLowerCase().indexOf(genre.toLowerCase()) !== -1){
            moviesByExclusionGenres.splice(moviesByExclusionGenres.indexOf(movie), 1)
          }
        }
        for(let real of realisateurs){
          if(movie.realisateur.toLowerCase().indexOf(real.toLowerCase()) !== -1){
            moviesByExclusionGenres.splice(moviesByExclusionGenres.indexOf(movie), 1)
          }
        }
        for(let act of acteurs){
          if(movie.casting.toLowerCase().indexOf(act.toLowerCase()) !== -1){
            moviesByExclusionGenres.splice(moviesByExclusionGenres.indexOf(movie), 1)
          }
        }
      }
    }
    return moviesByExclusionGenres;
  }

  public getMovieByInclusionGenres(movies: Array<Movie>, genres: Array<String>): Array<Movie> {
    let moviesByInclusionGenres = new Array<Movie>()
    for(let movie of movies) {
      for(let genre of genres) {
        if(JSON.stringify(movie.genre) != "") {
          let index = movie.genre.toLowerCase().indexOf(genre.toLowerCase());
          if(index != -1) {
            moviesByInclusionGenres.push(movie)
          }
        }				
      }
    }
    if(genres.length >= 1){
      return moviesByInclusionGenres;
    }else {
      return this.movies;
    }
  }

  public getMovieByExclusionReals(oldMovies: Array<Movie>, movies: Array<Movie>, genresS: Array<string>, genresA: Array<string>, realisateurs: Array<string>, acteurs: Array<string>): Array<Movie> {
    let genres = new Array()
    for(let genre of genresS){
      genres.push(genre)
    }
    for(let genre of genresA){
      genres.push(genre)
    }
    let moviesByExclusionReals = new Array<Movie>()
    for(let movie of oldMovies) {
      let present = false;
      for(let real of realisateurs) {
        if(JSON.stringify(movie.realisateur) != "") {
          let index = movie.realisateur.toLowerCase().indexOf(real.toLowerCase());
          if(index != -1) {
            present = true;
          }
        }				
      }
      if(!present) {
        moviesByExclusionReals.push(movie);
      }
    }
    for(let movie of this.getMoviesAlreadyExcluded(oldMovies, movies)){
      if(moviesByExclusionReals.indexOf(movie) !== -1){
        for(let genre of genres){
          if(movie.genre.toLowerCase().indexOf(genre.toLowerCase()) !== -1){
            moviesByExclusionReals.splice(moviesByExclusionReals.indexOf(movie), 1)
          }
        }
        for(let real of realisateurs){
          if(movie.realisateur.toLowerCase().indexOf(real.toLowerCase()) !== -1){
            moviesByExclusionReals.splice(moviesByExclusionReals.indexOf(movie), 1)
          }
        }
        for(let act of acteurs){
          if(movie.casting.toLowerCase().indexOf(act.toLowerCase()) !== -1){
            moviesByExclusionReals.splice(moviesByExclusionReals.indexOf(movie), 1)
          }
        }
      }
    }
    return moviesByExclusionReals;
  }

  public getMovieByInclusionReals(movies: Array<Movie>, reals: Array<String>): Array<Movie> {
    let moviesByInclusionReals = new Array<Movie>()
    for(let movie of movies) {
      for(let real of reals) {
        if(JSON.stringify(movie.realisateur) != "") {
          let index = movie.realisateur.toLowerCase().indexOf(real.toLowerCase());
          if(index != -1) {
            moviesByInclusionReals.push(movie);
          }
        }
      }
    }
    if(reals.length >= 1){
      return moviesByInclusionReals;
    }else {
      return this.movies;
    }
  }

  public getMovieByExclusionActors(oldMovies: Array<Movie>, movies: Array<Movie>, genresS: Array<string>, genresA: Array<string>, realisateurs: Array<string>, acteurs: Array<string>): Array<Movie> {
    let genres = new Array()
    for(let genre of genresS){
      genres.push(genre)
    }
    for(let genre of genresA){
      genres.push(genre)
    }
    let moviesByExclusionActors = new Array<Movie>()
    for(let movie of oldMovies) {
      let present = false;
      for(let actor of acteurs) {
        if(JSON.stringify(movie.casting) != "") {
          let index = movie.casting.toLowerCase().indexOf(actor.toLowerCase());
          if(index != -1) {
            present = true;
          }
        }				
      }
      if(!present) {
        moviesByExclusionActors.push(movie);
      }
    }
    for(let movie of this.getMoviesAlreadyExcluded(oldMovies, movies)){
      if(moviesByExclusionActors.indexOf(movie) !== -1){
        for(let genre of genres){
          if(movie.genre.toLowerCase().indexOf(genre.toLowerCase()) !== -1){
            moviesByExclusionActors.splice(moviesByExclusionActors.indexOf(movie), 1)
          }
        }
        for(let real of realisateurs){
          if(movie.realisateur.toLowerCase().indexOf(real.toLowerCase()) !== -1){
            moviesByExclusionActors.splice(moviesByExclusionActors.indexOf(movie), 1)
          }
        }
        for(let act of acteurs){
          if(movie.casting.toLowerCase().indexOf(act.toLowerCase()) !== -1){
            moviesByExclusionActors.splice(moviesByExclusionActors.indexOf(movie), 1)
          }
        }
      }
    }
    return moviesByExclusionActors;
  }

  public getMovieByInclusionActors(movies: Array<Movie>, actors: Array<String>): Array<Movie> {
    let moviesByInclusionActors = new Array<Movie>()
    for(let movie of movies) {
      for(let actor of actors) {
        if(JSON.stringify(movie.casting) != "") {
          let index = movie.casting.toLowerCase().indexOf(actor.toLowerCase());
          if(index != -1) {
            moviesByInclusionActors.push(movie);
          }
        }				
      }
    }
    if(actors.length >= 1){
      return moviesByInclusionActors;
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
