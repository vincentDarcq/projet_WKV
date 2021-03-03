import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Movie } from "../models/movie";
import { environment as ENV } from "../../environments/environment";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { movies } from "../models/movies";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  public movies: BehaviorSubject<Array<Movie>>;
  private moviesToSave = movies;
  private genres: Array<string>;
  private actors: Array<string>;
  private realisateurs: Array<string>;
  private wsUrl: string;
  private search = new Subject<any>();
  private IMDBApi = "http://www.omdbapi.com/?apikey=6b81888&t=Inception";
  private genresSimple: Array<string> = [
    "animation",
    "biopic",
    "comédie",
    "documentaire",
    "drame",
    "histoire",
    "thriller",
    "epouvante-Horreur",
    "science fiction",
    "aventure",
  ];
  private genresAvance: Array<string>;

  constructor(private httpClient: HttpClient) {
    this.wsUrl = ENV.apiUrl + "/movies";
    this.movies = new BehaviorSubject(Array<Movie>());
    this.httpClient
      .get(this.wsUrl)
      .subscribe((list: Array<Movie>) => this.movies.next(list) );
  }

  private getIndexMovie(id: Number): number {
    return this.movies.value.findIndex((movie) => movie.id === id);
  }

  public createMovie(movie: Movie) {
    let movies = this.movies.value;
    this.httpClient
      .post<Movie>(this.wsUrl, movie)
      .subscribe((movieFromJee) => {
        movies.push(
          new Movie(
            movieFromJee.titre,
            movieFromJee.synopsis,
            movieFromJee.genres,
            movieFromJee.casting,
            movieFromJee.realisateur,
            movieFromJee.cov_verticale,
            movieFromJee.cov_horizontale,
            movie.time,
            movieFromJee.year,
            movieFromJee.pegi,
            movieFromJee.avertissement,
            movieFromJee.id
          )
        )
        this.movies.next(movies);
      });
  }

  public updateMovie(movie: Movie) {
    let movies = this.movies.value;
    this.httpClient
      .put<Movie>(this.wsUrl + `/${movie.id}`, movie)
      .subscribe((movieFromJee) => {
        const index = this.getIndexMovie(movie.id);
        if (index >= 0) {
          movies.splice(
            index,
            1,
            new Movie(
              movieFromJee.titre,
              movieFromJee.synopsis,
              movieFromJee.genres,
              movieFromJee.casting,
              movieFromJee.realisateur,
              movieFromJee.cov_verticale,
              movieFromJee.cov_horizontale,
              movie.time,
              movieFromJee.year,
              movieFromJee.pegi,
              movieFromJee.avertissement,
              movieFromJee.id,
              movieFromJee.grade,
              movieFromJee.alloGrade,
              movieFromJee.imdbGrade
            )
          );
          this.movies.next(movies);
        }
      });
  }

  public getAlternativeIMDb(){
    this.httpClient.get("https://movie-database-imdb-alternative.p.rapidapi.com/", {
      headers: {
        "x-rapidapi-key": "6864765bafmshd5917a84cf4a549p114e8bjsn283ffb541696",
	      "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
	      "useQueryString": 'true'
      },
      params: {
        "s": "Outlander",
        "page": "1",
        "r": "json",
        "type": "series"
      }
    }).subscribe((movie: any) => {
      console.log(movie);
    })
  }

  public getIMDb() {
    let titres = new Array<string>();
    for(let t of this.moviesToSave){
      for(let m of this.movies.value){
        titres.push(m.titre);
      }
      if(titres.indexOf(t) === -1){
        const headers = {
          "x-rapidapi-key": "6864765bafmshd5917a84cf4a549p114e8bjsn283ffb541696",
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "useQueryString": 'true'
        }
        const headers2 = {
          "x-rapidapi-key": "6864765bafmshd5917a84cf4a549p114e8bjsn283ffb541696",
          "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
          "useQueryString": 'true'
        }
        let newMovie = new Movie();
        newMovie.titre = t;
        this.httpClient.get("https://imdb8.p.rapidapi.com/title/auto-complete", {
          headers: headers,
          params: {
            "q": t
          }
        }).subscribe((datas: any) => {
          console.log("1er appel")
          const id = datas.d[0].id;
          newMovie.year = datas.d[0].y;
          newMovie.cov_horizontale = datas.d[0].i.imageUrl;
          this.httpClient.get("https://movies-tvshows-data-imdb.p.rapidapi.com/", {
            headers: headers2,
            params: {
              "type": "get-movie-details",
              "imdb": id
            }
          }).subscribe((datas: any) => {
            console.log("2e appel")
            console.log(datas)
            for(let i=0; i<6; i++){
              if(datas.stars[i]){
                const cast = newMovie.casting ? newMovie.casting : "";
                newMovie.casting = cast + datas.stars[i] + ", ";
              }
            }
            for(let i=0; i<3; i++){
              if(datas.directors[i]){
                const real = newMovie.realisateur ? newMovie.realisateur : ""
                newMovie.realisateur = real + datas.directors[i] + ", ";
              }
            }
            newMovie.casting = newMovie.casting.substring(0, newMovie.casting.length-2);
            newMovie.realisateur = newMovie.realisateur.substring(0, newMovie.realisateur.length-2);
            this.httpClient.get("https://imdb8.p.rapidapi.com/title/get-overview-details", {
              headers: headers,
              params: {
                "tconst": id,
                "currentCountry": "US"
              }
            }).subscribe((datas: any) => {
              console.log("3e appel")
              newMovie.imdbGrade = datas.ratings.rating;
              newMovie.time = datas.title.runningTimeInMinutes+"mn";
              newMovie.synopsis = datas.plotSummary.text;
              if(datas.genres.indexOf("Adventure") !== -1){
                newMovie.genres = "Aventure, ";
              }
              if(datas.genres.indexOf("Comedy") !== -1){
                newMovie.genres += newMovie.genres ? newMovie.genres : "" + "Comedie, ";
              }
              if(datas.genres.indexOf("Drama") !== -1){
                newMovie.genres = newMovie.genres ? newMovie.genres : "" + "Drame, ";
              }
              if(datas.genres.indexOf("Biography") !== -1){
                newMovie.genres = newMovie.genres ? newMovie.genres : "" + "Biopic, ";
              }
              if(datas.genres.indexOf("Sci-Fi") !== -1){
                newMovie.genres = newMovie.genres ? newMovie.genres : "" + "Science fiction, ";
              }
              if(datas.genres.indexOf("Family") !== -1){
                newMovie.genres = newMovie.genres ? newMovie.genres : "" + "Jeunesse, ";
              }
              if(datas.genres.indexOf("Horror") !== -1){
                newMovie.genres = newMovie.genres ? newMovie.genres : "" + "Epouvante-Horreur, ";
              }
              if(datas.genres.indexOf("History") !== -1){
                newMovie.genres = newMovie.genres ? newMovie.genres : "" + "Histoire, ";
              }
              if(datas.genres.indexOf("War") !== -1){
                newMovie.genres = newMovie.genres ? newMovie.genres : "" + "Guerre, ";
              }
              if(datas.genres.indexOf("Documentary") !== -1){
                newMovie.genres = newMovie.genres ? newMovie.genres : "" + "Documentaire, ";
              }
              for(let genre of datas.genres){
                if(genre !== "Adventure" || genre !== "Comedy" || genre !== "Drama" || genre !== "Biography" 
                || genre !== "Sci-Fi" || genre !== "Family" || genre !== "Horror" || genre !== "History" 
                || genre !== "War" || genre !== "Documentary"){
                  newMovie.genres = newMovie.genres + genre + ", ";
                }
              }
              newMovie.genres = newMovie.genres.substring(0, newMovie.genres.length-2);
              console.log(newMovie);
              //this.createMovie(newMovie)
            })
          })
        })
      }
    }
  };

  getGenresFromApi(genre: string): string {
    var genres = "";
    while (genre.indexOf(", ") !== -1) {
      if (
        this.genresSimple.indexOf(genre.substring(0, genre.indexOf(", "))) !==
          -1 ||
        this.genresAvance.indexOf(genre.substring(0, genre.indexOf(", "))) !==
          -1
      ) {
        if (genres !== "") {
          genres = genres + genre.substring(0, genre.indexOf(", "));
        } else {
          genres = genres + genre.substring(0, genre.indexOf(", ")) + ", ";
        }
        genre = genre.substring(genre.indexOf(", ") + 2);
      } else {
        genre = genre.substring(genre.indexOf(", ") + 2);
      }
    }
    if (
      this.genresSimple.indexOf(genre) !== -1 ||
      this.genresAvance.indexOf(genre) !== -1
    ) {
      genres = genres + genre;
    }
    return genres;
  }

  public getGenres(): Array<string> {
    this.genres = new Array();
    this.httpClient
      .get(this.wsUrl + `/genres`)
      .subscribe((list: Array<string>) => {
        this.genres.push(...list);
      });
    return this.genres;
  }

  public getGenresAvances(): Array<string> {
    this.genresAvance = new Array();
    for (let genre of this.genres) {
      if (this.genresSimple.indexOf(genre) === -1) {
        genre = genre[0].toUpperCase() + genre.substring(1);
        this.genresAvance.push(genre);
      }
    }
    return this.genresAvance;
  }

  public getRealisateurs(): Array<string> {
    this.realisateurs = new Array();
    this.httpClient
      .get(this.wsUrl + `/realisateurs`)
      .subscribe((list: Array<string>) => this.realisateurs.push(...list));
    return this.realisateurs;
  }

  public getActors(): Array<string> {
    this.actors = new Array();
    this.httpClient
      .get(this.wsUrl + `/acteurs`)
      .subscribe((list: Array<string>) => this.actors.push(...list));
    return this.actors;
  }

  private getMoviesAlreadyExcluded(
    oldMovies: Array<Movie>,
    movies: Array<Movie>
  ) {
    let moviesExcluded = new Array();
    for (let movie of oldMovies) {
      if (movies.indexOf(movie) === -1) {
        moviesExcluded.push(movie);
      }
    }
    return moviesExcluded;
  }

  private eraseOldSelected(
    oldMovies: Array<Movie>,
    movies: Array<Movie>,
    moviesByExclusion: Array<Movie>,
    genres: Array<string>,
    realisateurs: Array<string>,
    acteurs: Array<string>
  ) {
    for (let movie of this.getMoviesAlreadyExcluded(oldMovies, movies)) {
      if (moviesByExclusion.indexOf(movie) !== -1) {
        for (let genre of genres) {
          if (movie.genre.toLowerCase().indexOf(genre.toLowerCase()) !== -1) {
            moviesByExclusion.splice(moviesByExclusion.indexOf(movie), 1);
          }
        }
        for (let real of realisateurs) {
          if (
            movie.realisateur.toLowerCase().indexOf(real.toLowerCase()) !== -1
          ) {
            moviesByExclusion.splice(moviesByExclusion.indexOf(movie), 1);
          }
        }
        for (let act of acteurs) {
          if (movie.casting.toLowerCase().indexOf(act.toLowerCase()) !== -1) {
            moviesByExclusion.splice(moviesByExclusion.indexOf(movie), 1);
          }
        }
      }
    }
    return moviesByExclusion;
  }

  public getMovieByExclusionGenres(
    oldMovies: Array<Movie>,
    movies: Array<Movie>,
    genresS: Array<string>,
    genresA: Array<string>,
    realisateurs: Array<string>,
    acteurs: Array<string>
  ): Array<Movie> {
    let genres = new Array();
    for (let genre of genresS) {
      genres.push(genre);
    }
    for (let genre of genresA) {
      genres.push(genre);
    }
    let moviesByExclusionGenres = new Array<Movie>();
    for (let movie of oldMovies) {
      let present = false;
      for (let genre of genres) {
        if (JSON.stringify(movie.genres) != "") {
          let index = movie.genres.toLowerCase().indexOf(genre.toLowerCase());
          if (index != -1) {
            present = true;
          }
        }
      }
      if (!present) {
        moviesByExclusionGenres.push(movie);
      }
    }
    moviesByExclusionGenres = this.eraseOldSelected(
      oldMovies,
      movies,
      moviesByExclusionGenres,
      genres,
      realisateurs,
      acteurs
    );
    return moviesByExclusionGenres;
  }

  public getMovieByInclusionGenres(
    movies: Array<Movie>,
    genres: Array<String>
  ): Array<Movie> {
    let moviesByInclusionGenres = new Array<Movie>();
    for (let movie of movies) {
      for (let genre of genres) {
        if (JSON.stringify(movie.genres) != "") {
          let index = movie.genres.toLowerCase().indexOf(genre.toLowerCase());
          if (index != -1) {
            moviesByInclusionGenres.push(movie);
          }
        }
      }
    }
    if (genres.length >= 1) {
      return moviesByInclusionGenres;
    } else {
      return this.movies.value;
    }
  }

  public getMovieByExclusionReals(
    oldMovies: Array<Movie>,
    movies: Array<Movie>,
    genresS: Array<string>,
    genresA: Array<string>,
    realisateurs: Array<string>,
    acteurs: Array<string>
  ): Array<Movie> {
    let genres = new Array();
    for (let genre of genresS) {
      genres.push(genre);
    }
    for (let genre of genresA) {
      genres.push(genre);
    }
    let moviesByExclusionReals = new Array<Movie>();
    for (let movie of oldMovies) {
      let present = false;
      for (let real of realisateurs) {
        if (JSON.stringify(movie.realisateur) != "") {
          let index = movie.realisateur
            .toLowerCase()
            .indexOf(real.toLowerCase());
          if (index != -1) {
            present = true;
          }
        }
      }
      if (!present) {
        moviesByExclusionReals.push(movie);
      }
    }
    moviesByExclusionReals = this.eraseOldSelected(
      oldMovies,
      movies,
      moviesByExclusionReals,
      genres,
      realisateurs,
      acteurs
    );
    return moviesByExclusionReals;
  }

  public getMovieByInclusionReals(
    movies: Array<Movie>,
    reals: Array<String>
  ): Array<Movie> {
    let moviesByInclusionReals = new Array<Movie>();
    for (let movie of movies) {
      for (let real of reals) {
        if (JSON.stringify(movie.realisateur) != "") {
          let index = movie.realisateur
            .toLowerCase()
            .indexOf(real.toLowerCase());
          if (index != -1) {
            moviesByInclusionReals.push(movie);
          }
        }
      }
    }
    if (reals.length >= 1) {
      return moviesByInclusionReals;
    } else {
      return this.movies.value;
    }
  }

  public getMovieByExclusionActors(
    oldMovies: Array<Movie>,
    movies: Array<Movie>,
    genresS: Array<string>,
    genresA: Array<string>,
    realisateurs: Array<string>,
    acteurs: Array<string>
  ): Array<Movie> {
    let genres = new Array();
    for (let genre of genresS) {
      genres.push(genre);
    }
    for (let genre of genresA) {
      genres.push(genre);
    }
    let moviesByExclusionActors = new Array<Movie>();
    for (let movie of oldMovies) {
      let present = false;
      for (let actor of acteurs) {
        if (JSON.stringify(movie.casting) != "") {
          let index = movie.casting.toLowerCase().indexOf(actor.toLowerCase());
          if (index != -1) {
            present = true;
          }
        }
      }
      if (!present) {
        moviesByExclusionActors.push(movie);
      }
    }
    moviesByExclusionActors = this.eraseOldSelected(
      oldMovies,
      movies,
      moviesByExclusionActors,
      genres,
      realisateurs,
      acteurs
    );
    return moviesByExclusionActors;
  }

  public getMovieByInclusionActors(
    movies: Array<Movie>,
    actors: Array<String>
  ): Array<Movie> {
    let moviesByInclusionActors = new Array<Movie>();
    for (let movie of movies) {
      for (let actor of actors) {
        if (JSON.stringify(movie.casting) != "") {
          let index = movie.casting.toLowerCase().indexOf(actor.toLowerCase());
          if (index != -1) {
            moviesByInclusionActors.push(movie);
          }
        }
      }
    }
    if (actors.length >= 1) {
      return moviesByInclusionActors;
    } else {
      return this.movies.value;
    }
  }

  setSearch(search: string) {
    this.search.next(search);
  }

  getSearch(): Observable<any> {
    return this.search.asObservable();
  }
}
