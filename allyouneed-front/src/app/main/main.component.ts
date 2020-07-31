import { Component, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import { User } from '../models/user';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/note';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, DoCheck {

  private movies: Array<Movie>;
  private bestMovie: Movie;
  private bestHeightMovies: Array<Movie>;
  private bestGrades: Array<Movie>;
  private movieSearched: Array<Movie>;
  private moviesExcluded: Array<Movie>;
  private genres: Array<string>;
  private realisateurs: Array<string>;
  private actors: Array<string>;
  private genresSelected: Array<string>;
  private realisateursSelected: Array<string>;
  private actorsSelected: Array<string>;
  private currentUser: User;
  private notes: Array<Note>;
  private exclusion: boolean = true;
  private displayGenres: boolean = false;
  private displayRealisateurs: boolean = false;
  private displayActeurs: boolean = false;
  private displayMovie: boolean = false;
  private bestMoviesChecked: boolean = false;
  private genreFound: boolean = false;
  private realFound: boolean = false;
  private actorFound: boolean = false;
  private genreInput: string;
  private realInput: string;
  private actorInput: string;
  private search: string;
  private searching: boolean = false;

  constructor(private movieService: MoviesService,
              private noteService: NotesService) {

    this.moviesExcluded = new Array();
    this.movieSearched = new Array();
    this.bestHeightMovies = new Array();
    this.bestGrades = new Array();
    this.genresSelected = new Array();
    this.realisateursSelected = new Array();
    this.actorsSelected = new Array();
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }
  
  
  ngOnInit() {    
    this.movies = this.movieService.getMovies();
    this.genres = this.movieService.getGenres()
    this.actors = this.movieService.getActors();
    this.realisateurs = this.movieService.getRealisateurs();
    this.notes = this.noteService.getNotes();
    this.bestGrades = this.noteService.getBestNotes();
    this.movieService.getSearch().subscribe(
      (search) => {
        this.search = search
      })
    }

  testAllo(){
    this.movieService.getAllo()
  }

  ngDoCheck(): void {
    if(typeof this.search !== 'undefined' && this.search !== ""){
      this.movieSearched.splice(0, this.movieSearched.length)
      for(let movie of this.movies){
        if(movie.titre.toLowerCase().indexOf(this.search) !== -1){
          if(this.movieSearched.indexOf(movie) === -1){
            this.movieSearched.push(movie);
            this.searching = true;
          }
        }
      }
    }else {
      this.searching = false;
    }
    if(this.bestGrades.length >=1 && !this.bestMoviesChecked){
      this.bestMoviesChecked = true;
      for(let movie of this.bestGrades){
        let compt = 0;
        let value = 0;
        for(let note of this.notes){
          if(movie.titre === note.movie.titre){
            compt ++;
            value += note.note;
          }
        }
        if(compt >= 1){
          movie.note = value/compt;
        }
      }
      this.bestMovie = this.bestGrades[0];
      for(let i=1; i<9; i++){
        this.bestHeightMovies.push(this.bestGrades[i]);
      }
    }
  }

  switchMode(){
    this.exclusion = !this.exclusion;
  }

  genreSearched(searchValue: string){
    this.genreFound = false
    for(let genre of this.genres){
      if(genre === searchValue){
        this.genreFound = true;
        this.genreInput = genre;
      }
    }
  }

  genreSelected(genreSelected: string){  
    if(this.genreInput === genreSelected){
      this.genreFound = false
    }
    for (let genre of this.genres){
      if(genre === genreSelected){
        this.genresSelected.push(genre);
        var index = this.genres.indexOf(genre)
        this.genres.splice(index, 1)
      }
    }
    if(this.exclusion){
      this.movies = this.movieService.getMovieByExclusionGenres(this.genresSelected);
    } else{
      this.movies = this.movieService.getMovieByInclusionGenres(this.genresSelected);
    }
  }

  genreRestored(genreRestored: string){
    for (let genre of this.genresSelected){
      if(genre === genreRestored){
        this.genres.push(genre);
        this.genres.sort()
        var index = this.genresSelected.indexOf(genre)
        this.genresSelected.splice(index, 1)
      }
    }
    if(this.exclusion){
      this.movies = this.movieService.getMovieByExclusionGenres(this.genresSelected);
    } else{
      this.movies = this.movieService.getMovieByInclusionGenres(this.genresSelected);
    }
  }

  realSearched(searchValue: string){
    this.realFound = false
    for(let real of this.realisateurs){
      if(real === searchValue){
        this.realFound = true;
        this.realInput = real;
      }
    }
  }

  realSelected(realSelected: string){
    if(this.realInput === realSelected){
      this.realFound = false
    }
    for (let real of this.realisateurs){
      if(real === realSelected){
        this.realisateursSelected.push(real);
        var index = this.realisateurs.indexOf(real)
        this.realisateurs.splice(index, 1)
      }
    }
    if(this.exclusion){
      this.movies = this.movieService.getMovieByExclusionReals(this.realisateursSelected);
    }else {
      this.movies = this.movieService.getMovieByInclusionReals(this.realisateursSelected);
    }
  }

  realRestored(realRestored: string){
    for (let real of this.realisateursSelected){
      if(real === realRestored){
        this.realisateurs.push(real);
        var index = this.realisateursSelected.indexOf(real)
        this.realisateursSelected.splice(index, 1)
      }
    }
    if(this.exclusion){
      this.movies = this.movieService.getMovieByExclusionReals(this.realisateursSelected);
    }else {
      this.movies = this.movieService.getMovieByInclusionReals(this.realisateursSelected);
    }
  }

  actorSearched(searchValue: string){
    this.actorFound = false
    for(let actor of this.actors){
      if(actor === searchValue){
        this.actorFound = true;
        this.actorInput = actor;
      }
    }
  }

  actorSelected(actorSelected: string){
    if(this.actorInput === actorSelected){
      this.actorFound = false
    }
    for (let actor of this.actors){
      if(actor === actorSelected){
        this.actorsSelected.push(actor);
        var index = this.actors.indexOf(actor)
        this.actors.splice(index, 1)
      }
    }
    if(this.exclusion){
      this.movies = this.movieService.getMovieByExclusionActors(this.actorsSelected);
    }else {
      this.movies = this.movieService.getMovieByInclusionActors(this.actorsSelected);
    }
  }

  actorRestored(actorRestored: string){
    for (let actor of this.actorsSelected){
      if(actor === actorRestored){
        this.actors.push(actor);
        var index = this.actorsSelected.indexOf(actor)
        this.actorsSelected.splice(index, 1)
      }
    }
    this.movies = this.movieService.getMovieByExclusionActors(this.actorsSelected);
  }

  public showGenres(){
    this.displayGenres = true;
  }

  public hideGenres(){
    this.displayGenres = false;
  }

  public showGenresExclus(){
    document.getElementById("genresExclus").style.display = "block";
  }

  public hideGenresExclus(){
    document.getElementById("genresExclus").style.display = "none";
  }

  public showRealisateurs(){
    this.displayRealisateurs = true;
  }

  public hideRealisateurs(){
    this.displayRealisateurs = false;
  }

  public showRealsExclus(){
    document.getElementById("realsExclus").style.display = "block";
  }

  public hideRealsExclus(){
    document.getElementById("realsExclus").style.display = "none";
  }

  public showActeurs(){
    this.displayActeurs = true;
  }

  public hideActeurs(){
    this.displayActeurs = false;
  }

  public showActorsExclus(){
    document.getElementById("actorsExclus").style.display = "block";
  }

  public hideActorsExclus(){
    document.getElementById("actorsExclus").style.display = "none";
  }

  public showMovie(){
    this.displayMovie = true;
  }

  public hideMovie(){
    this.displayMovie = false;
  }

}
