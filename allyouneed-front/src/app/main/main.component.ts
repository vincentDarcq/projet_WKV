import { Component, ViewEncapsulation, OnInit, DoCheck } from '@angular/core';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import { User } from '../models/user';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/note';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, DoCheck {

  movies: Array<Movie>;
  bestMovie: Movie;
  bestHeightMovies: Array<Movie>;
  bestGrades: Array<Movie>;
  movieSearched: Array<Movie>;
  moviesExcluded: Array<Movie>;
  genres: Array<string>;
  genresSimple: Array<string> = ["Animation", "Biopic", "Comédie", "Documentaire", 
  "Drame", "Histoire", "Thriller", "Epouvante-Horreur", "Science fiction", "Aventure"];
  genresAvance: Array<string>;
  avances : Array<string>;
  realisateurs: Array<string>;
  tenReals: Array<string>;
  tenActors: Array<string>;
  actors: Array<string>;
  genresSelected: Array<string>;
  realisateursSelected: Array<string>;
  actorsSelected: Array<string>;
  currentUser: User;
  notes: Array<Note>;
  exclusion: boolean = true;
  displayGenres: boolean = false;
  displayGenresAvance: boolean = false;
  displayRealisateurs: boolean = false;
  displayActeurs: boolean = false;
  bestMoviesChecked: boolean = false;
  genreFound: boolean = false;
  realFound: boolean = false;
  actorFound: boolean = false;
  genreInput: string;
  realInput: string;
  actorInput: string;
  search: string;
  searching: boolean = false;

  constructor(private movieService: MoviesService,
              private noteService: NotesService) {

    this.moviesExcluded = new Array();
    this.movieSearched = new Array();
    this.bestHeightMovies = new Array();
    this.bestGrades = new Array();
    this.genresSelected = new Array();
    this.genresAvance = new Array();
    this.realisateursSelected = new Array();
    this.actorsSelected = new Array();
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }  
  
  ngOnInit() {   
    this.genresAvance = ["Guerre", "Policier", "Jeunesse", "Fantasy", "Action",
    "Musical", "Romance", "Super Héros", "Gore", "Français"]
    this.tenReals = ["Steven Spielberg", "Michael Bay", "Tim Burton", "Ron Howard",
    "James Cameron", "Ridley Scott", "Chris Colombus", "Guy Ritchie", "Martin Scorcese", "David Fincher"]
    this.tenActors = ["Al Pacino", "Robert De Niro", "Leonardo DiCaprio", "Kevin Spacey",
    "Marlon Brando", "Clint Eastwood", "Morgan Freeman", "Johnny Depp", "Jack Nicholson", "Joaquin Phoenix"]
    this.movies = this.movieService.getMovies();
    this.genres = this.movieService.getGenres();
    this.actors = this.movieService.getActors();
    this.realisateurs = this.movieService.getRealisateurs();
    this.notes = this.noteService.getNotes();
    this.bestGrades = this.noteService.getBestNotes();
    this.movieService.getSearch().subscribe(
      (search) => {
        this.search = search
      })
    }

  testIMDB(){
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
    this.exclusion = !this.exclusion
  }

  searched(searchValue: string){
    this.genreFound = false
    this.realFound = false
    this.actorFound = false
    if(this.genres.indexOf(searchValue.toLowerCase()) !== -1){
      this.genreFound = true;
      this.genreInput = searchValue
    }else if(this.realisateurs.indexOf(searchValue.toLowerCase()) !== -1){
      this.realFound = true
      this.realInput = searchValue
    }else if(this.actors.indexOf(searchValue.toLowerCase()) !== -1){
      this.actorFound = true
      this.actorInput = searchValue
    }
  }

  selected(selected: Array<string>, type: string){  
    if(type === "genres"){
      if(this.exclusion){
        this.movies = this.movieService.getMovieByExclusionGenres(selected)
      }else{
        this.movies = this.movieService.getMovieByInclusionGenres(selected)
      }
    }
    if(type === "realisateurs"){
      if(this.exclusion){
        this.movies = this.movieService.getMovieByExclusionReals(selected);
      }else {
        this.movies = this.movieService.getMovieByInclusionReals(selected);
      }
    }
    if(type === "acteurs"){
      if(this.exclusion){
        this.movies = this.movieService.getMovieByExclusionActors(selected);
      }else {
        this.movies = this.movieService.getMovieByInclusionActors(selected);
      }
    }
  }

  showGenresSimples(){
    this.displayGenres = true;
  }

  hideGenresSimples(){
    this.displayGenres = false;
  }

  showGenresAvance(){
    this.displayGenresAvance = true;
  }

  hideGenresAvance(){
    this.displayGenresAvance = false;
  }

  showRealisateurs(){
    this.displayRealisateurs = true;
  }

  hideRealisateurs(){
    this.displayRealisateurs = false;
  }

  showActeurs(){
    this.displayActeurs = true;
  }

  hideActeurs(){
    this.displayActeurs = false;
  }

}
