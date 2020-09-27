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
  firstLine: Array<Movie>;
  secondLine: Array<Movie>;
  bestAlloGrades: Array<Movie>;
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
  displayGenres: boolean = true;
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
  searching: boolean = false;

  constructor(private movieService: MoviesService,
              private noteService: NotesService) {

    this.moviesExcluded = new Array();
    this.movieSearched = new Array();
    this.firstLine = new Array();
    this.secondLine = new Array();
    this.bestAlloGrades = new Array();
    this.genres = new Array();
    this.genresSelected = new Array();
    this.genresAvance = new Array();
    this.realisateursSelected = new Array();
    this.tenActors = new Array();
    this.actorsSelected = new Array();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }  
  
  ngOnInit() {   
    this.tenReals = this.movieService.getTenReals()
    this.tenActors = this.movieService.getTenActors()
    this.movies = this.movieService.getMovies()
    this.genres = this.movieService.getGenres()
    this.actors = this.movieService.getActors()
    this.realisateurs = this.movieService.getRealisateurs()
    this.notes = this.noteService.getNotes()
    this.bestAlloGrades = this.noteService.getBestAllocine()
    this.movieService.getSearch().subscribe(
      (search) => {
        this.movieSearch(search)
      })
    }

  testIMDB(){
    this.movieService.getApi()
  }

  ngDoCheck(): void {
    if(this.genres.length > 0 && this.genresAvance.length === 0){
      this.genresAvance = this.movieService.getGenresAvances()
    }
    if(this.bestAlloGrades.length >=1 && !this.bestMoviesChecked){
      this.bestMoviesChecked = true
      this.bestMovie = this.bestAlloGrades[0];
    }
    if(this.realisateurs.length >=1){
      for(let i=0; i<this.realisateurs.length; i++){
        this.realisateurs[i] = this.realisateurs[i].toLowerCase()
      }
    }
    if(this.actors.length >=1){
      for(let i=0; i<this.actors.length; i++){
        this.actors[i] = this.actors[i].toLowerCase()
      }
    }
  }

  movieSearch(search: string){
    if(typeof search !== 'undefined' && search !== ""){
      this.movieSearched.splice(0, this.movieSearched.length)
      for(let movie of this.movies){
        if(movie.titre.toLowerCase().indexOf(search) !== -1){
          if(this.movieSearched.indexOf(movie) === -1){
            this.movieSearched.push(movie)
            this.searching = true
          }
        }
      }
    }else {
      this.searching = false;
    }
  }

  switchMode(){
    this.exclusion = !this.exclusion
  }

  searched(searchValue: string){
    this.genreFound = false
    this.realFound = false
    this.actorFound = false
    if(this.genresAvance.indexOf(searchValue.toLowerCase()) !== -1){
      this.genreFound = true
      this.genreInput = this.getUpperForFirstLetter(searchValue)
    }else if(this.realisateurs.indexOf(searchValue.toLowerCase()) !== -1){
      this.realFound = true
      this.realInput = this.getUpperForFirstLetter(searchValue)
    }else if(this.actors.indexOf(searchValue.toLowerCase()) !== -1){
      this.actorFound = true
      this.actorInput = this.getUpperForFirstLetter(searchValue)
    }
  }

  selected(selected: Array<string>, type: string){  
    if(type === "genres"){
      if(this.exclusion){
        this.bestAlloGrades = this.movieService.getMovieByExclusionGenres(this.bestAlloGrades, selected)
      }else{
        this.bestAlloGrades = this.movieService.getMovieByInclusionGenres(this.bestAlloGrades, selected)
      }
    }
    if(type === "realisateurs"){
      if(this.exclusion){
        this.bestAlloGrades = this.movieService.getMovieByExclusionReals(this.bestAlloGrades, selected)
      }else {
        this.bestAlloGrades = this.movieService.getMovieByInclusionReals(this.bestAlloGrades, selected)
      }
    }
    if(type === "acteurs"){
      if(this.exclusion){
        this.bestAlloGrades = this.movieService.getMovieByExclusionActors(this.bestAlloGrades, selected)
      }else {
        this.bestAlloGrades = this.movieService.getMovieByInclusionActors(this.bestAlloGrades, selected)
      }
    }
  }

  displayBoxes(type: string){
    if(type === "genresSimples"){
      this.displayGenres = !this.displayGenres
      this.displayGenresAvance = false
      this.displayRealisateurs = false
      this.displayActeurs = false
    }else if(type === "genresAvances"){
      this.displayGenresAvance = !this.displayGenresAvance;
      this.displayGenres = false
      this.displayRealisateurs = false
    this.displayActeurs = false
    }else if(type === "reals"){
      this.displayRealisateurs = !this.displayRealisateurs
      this.displayGenres = false
      this.displayGenresAvance = false
      this.displayActeurs = false
    }else if(type === "acteurs"){
      this.displayActeurs = !this.displayActeurs
      this.displayGenres = false
      this.displayGenresAvance = false
      this.displayRealisateurs = false
    }
  }

  getUpperForFirstLetter(type: string){
    let indexSpace = type.indexOf(" ")
    if(indexSpace === -1){      
      return type[0].toUpperCase()+type.substring(1)
    }else {
      return type[0].toUpperCase()+type.substring(1, indexSpace) +
      " " + type[indexSpace+1].toUpperCase()+type.substring(indexSpace+2)
    }
  }

}
