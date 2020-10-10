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
  private tenActors : Array<string>;
  private tenReals : Array<string>;
  private realisateurs : Array<string>;
  private wsUrl: string;
  private search = new Subject<any>();
  private IMDBApi = 'http://www.omdbapi.com/?apikey=6b81888&s=inception';
  private wikiApi = 'http://fr.wikipedia.org/w/api.php?action=opensearch&search=inception'
  private genresSimple: Array<string> = ["animation", "biopic", "comédie", "documentaire", 
    "drame", "histoire", "thriller", "epouvante-Horreur", "science fiction", "aventure"];
  private genresAvance: Array<string>;


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
    this.genresAvance = new Array();
    this.realisateurs = new Array();
    this.actors = new Array();
    this.tenActors = new Array();
    this.tenReals = new Array();
    this.wsUrl = ENV.apiUrl + '/movies';

   }

  public getMovies(): Array<Movie> {
    this.movies.splice(0, this.movies.length);
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
    this.genres.splice(0, this.genres.length);
    this.httpClient.get(this.wsUrl + `/genres`)
      .subscribe((list: Array<string>) => {
        this.genres.push(...list)
      });
      return this.genres
  } 

  public getGenresAvances(): Array<string> {
    this.genresAvance.splice(0, this.genresAvance.length);
    for(let genre of this.genres){
      if(this.genresSimple.indexOf(genre) === -1){
        genre = genre[0].toUpperCase()+genre.substring(1)
        this.genresAvance.push(genre)
      }
    }
    return this.genresAvance
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

  public getTenActors(): Array<string> {
    this.tenActors.splice(0, this.tenActors.length);
    this.httpClient.get(this.wsUrl + `/tenActeurs`)
    .subscribe((list: Array<string>) => {
      this.tenActors.push(...list)
    });
    return this.tenActors;
  }

  public getTenReals(): Array<string> {
    this.tenReals.splice(0, this.tenReals.length);
    this.httpClient.get(this.wsUrl + `/tenRealisateurs`)
    .subscribe((list: Array<string>) => {
      this.tenReals.push(...list)
    });
    return this.tenReals;
  }

  public getMovieByExclusionGenres(movies: Array<Movie>, genres: Array<String>): Array<Movie> {
    this.moviesByExclusionGenres = new Array<Movie>()
    for(let movie of movies) {
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

  public getMovieByInclusionGenres(movies: Array<Movie>, genres: Array<String>): Array<Movie> {
    this.moviesByInclusionGenres = new Array<Movie>()
    for(let movie of movies) {
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

  public getMovieByExclusionReals(movies: Array<Movie>, reals: Array<String>): Array<Movie> {
    this.moviesByExclusionReals = new Array<Movie>()
    for(let movie of movies) {
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

  public getMovieByInclusionReals(movies: Array<Movie>, reals: Array<String>): Array<Movie> {
    this.moviesByInclusionReals = new Array<Movie>()
    for(let movie of movies) {
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

  public getMovieByExclusionActors(movies: Array<Movie>, actors: Array<String>): Array<Movie> {
    this.moviesByExclusionActors = new Array<Movie>()
    for(let movie of movies) {
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

  public getMovieByInclusionActors(movies: Array<Movie>, actors: Array<String>): Array<Movie> {
    this.moviesByInclusionActors = new Array<Movie>()
    for(let movie of movies) {
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
