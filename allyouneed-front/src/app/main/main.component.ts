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
  bestGrades: Array<Movie>;
  movieSearched: Array<Movie>;
  moviesExcluded: Array<Movie>;
  genre: Array<string>;
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
    this.bestGrades = new Array();
    this.genre = new Array();
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
    this.genre = this.movieService.getGenres()
    this.actors = this.movieService.getActors()
    this.realisateurs = this.movieService.getRealisateurs()
    this.notes = this.noteService.getNotes()
    this.bestGrades = this.noteService.getBestAllocine()
    this.movieService.getSearch().subscribe(
      (search) => {
        this.movieSearch(search)
      })
    }

  testIMDB(){
    this.movieService.getApi()
  }

  ngDoCheck(): void {
    if(this.genre.length > 0 && this.genresAvance.length === 0){
      this.genresAvance = this.movieService.getGenresAvances()
    }
    if(this.bestGrades.length >=1 && !this.bestMoviesChecked){
      this.bestMoviesChecked = true
      this.bestMovie = this.bestGrades[0];
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
        this.movies = this.movieService.getMovieByExclusionReals(selected)
      }else {
        this.movies = this.movieService.getMovieByInclusionReals(selected)
      }
    }
    if(type === "acteurs"){
      if(this.exclusion){
        this.movies = this.movieService.getMovieByExclusionActors(selected)
      }else {
        this.movies = this.movieService.getMovieByInclusionActors(selected)
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

}
