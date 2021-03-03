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
  bestAlloGrades: Array<Movie>;
  oldBestAlloGrades: Array<Movie>;
  movieSearched: Array<Movie>;
  genres: Array<string>;
  genresSimple: Array<string> = ["Animation", "Biopic", "Comédie", "Documentaire", 
  "Drame", "Histoire", "Thriller", "Epouvante-Horreur", "Science fiction", "Aventure"];
  genresAvance: Array<string>;
  avances : Array<string>;
  realisateurs: Array<string>;
  tenReals: Array<string>;
  tenActors: Array<string>;
  actors: Array<string>;
  genresSelectedS: Array<string>;
  genresSelectedA: Array<string>;
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

    this.movieSearched = new Array();
    this.bestAlloGrades = new Array();
    this.oldBestAlloGrades = new Array();
    this.genres = new Array();
    this.genresSelectedS = new Array();
    this.genresSelectedA = new Array();
    this.realisateursSelected = new Array();
    this.actorsSelected = new Array();
    this.genresAvance = new Array();
    this.realisateursSelected = new Array();
    this.tenActors = new Array();
    this.tenReals = new Array();
  }  
  
  ngOnInit() {   
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.movieService.movies.subscribe( movies => {
      this.movies = movies;
    });
    this.genres = this.movieService.getGenres();
    this.actors = this.movieService.getActors();
    this.realisateurs = this.movieService.getRealisateurs();
    this.notes = this.noteService.getNotes();
    this.bestAlloGrades = this.noteService.getBestAllocine();
    this.oldBestAlloGrades = this.bestAlloGrades;
    this.movieService.getSearch().subscribe(
      (search) => {
        this.movieSearch(search)
      });
    }

  testIMDB(){
    this.movieService.getIMDb();
  }

  ngDoCheck(): void {
    if(this.genres.length > 0 && this.genresAvance.length === 0){
      this.genresAvance = this.movieService.getGenresAvances();
    }
    if(this.bestAlloGrades.length >=1 && !this.bestMoviesChecked){
      this.bestMoviesChecked = true;
      this.bestMovie = this.bestAlloGrades[0];
    }
    if(this.realisateurs.length >=1 && this.tenReals.length === 0){
      for(let i=0; i<this.realisateurs.length; i++){
        this.realisateurs[i] = this.realisateurs[i].toLowerCase();
        if(this.tenReals.length < 10){
          this.tenReals.push(this.realisateurs[i]);
        }
      }
    }
    if(this.actors.length >=1 && this.tenActors.length === 0){
      for(let i=0; i<this.actors.length; i++){
        this.actors[i] = this.actors[i].toLowerCase();
        if(this.tenActors.length < 10){
          this.tenActors.push(this.actors[i]);
        }
      }
    }
  }

  movieSearch(search: string){
    if(typeof search !== 'undefined' && search !== ""){
      this.movieSearched.splice(0, this.movieSearched.length)
      for(let movie of this.movies){
        if(movie.titre.toLowerCase().indexOf(search) !== -1){
          if(this.movieSearched.indexOf(movie) === -1){
            this.movieSearched.push(movie);
            this.searching = true;
          }
        }
      }
    }else {
      this.searching = false;
    }
  }

  switchMode(){
    this.exclusion = !this.exclusion;
  }

  searched(searchValue: string){
    this.genreFound = false;
    this.realFound = false;
    this.actorFound = false;
    if(this.genresAvance.indexOf(searchValue.toLowerCase()) !== -1){
      this.genreFound = true;
      this.genreInput = this.getUpperForFirstLetter(searchValue);
    }else if(this.realisateurs.indexOf(searchValue.toLowerCase()) !== -1){
      this.realFound = true;
      this.realInput = this.getUpperForFirstLetter(searchValue);
    }else if(this.actors.indexOf(searchValue.toLowerCase()) !== -1){
      this.actorFound = true;
      this.actorInput = this.getUpperForFirstLetter(searchValue);
    }
  }

  genreSelected(selected: Array<string>){
    if(this.exclusion){
      this.bestAlloGrades = this.movieService.getMovieByExclusionGenres(
        this.oldBestAlloGrades, 
        this.bestAlloGrades, 
        this.genresSelectedS, 
        this.genresSelectedA, 
        this.realisateursSelected, 
        this.actorsSelected);
    }else{
      this.bestAlloGrades = this.movieService.getMovieByInclusionGenres(this.oldBestAlloGrades, selected);
    }
  }

  selected(selected: Array<string>, type: string){  
    if(type === "genresS"){
      this.genresSelectedS = selected;
      this.genreSelected(selected);
      for(let genre of this.genresSimple){
        if(selected.indexOf(genre) !== -1){
          const index = this.genresSimple.indexOf(genre);
          this.genresSimple.splice(index, 1);
        }
      }
    }
    if(type === "genresA"){
      this.genresSelectedA = selected;
      this.genreSelected(selected);
      this.genresAvance = new Array();
      for(let genre of this.genres){
        if(selected.indexOf(this.getUpperForFirstLetter(genre)) === -1 && this.genresAvance.length <10){
          this.genresAvance.push(this.getUpperForFirstLetter(genre));
        }
      }
    }
    if(type === "realisateurs"){
      this.realisateursSelected = selected;
      if(this.exclusion){
        this.tenReals = new Array<string>();
        for(let r of this.realisateurs){
          if(this.realisateursSelected.indexOf(r) === -1 && this.tenReals.length < 10){
            this.tenReals.push(r);
          }
        }
        this.bestAlloGrades = this.movieService.getMovieByExclusionReals(
          this.oldBestAlloGrades, 
          this.bestAlloGrades, 
          this.genresSelectedS, 
          this.genresSelectedA, 
          this.realisateursSelected, 
          this.actorsSelected);
      }else {
        this.bestAlloGrades = this.movieService.getMovieByInclusionReals(this.oldBestAlloGrades, selected);
      }
    }
    if(type === "acteurs"){
      this.actorsSelected = selected;
      this.tenActors = new Array<string>();
        for(let a of this.actors){
          if(this.actorsSelected.indexOf(a) === -1 && this.tenActors.length < 10){
            this.tenActors.push(a);
          }
        }
      if(this.exclusion){
        this.bestAlloGrades = this.movieService.getMovieByExclusionActors(
          this.oldBestAlloGrades, 
          this.bestAlloGrades, 
          this.genresSelectedS, 
          this.genresSelectedA, 
          this.realisateursSelected, 
          this.actorsSelected);
      }else {
        this.bestAlloGrades = this.movieService.getMovieByInclusionActors(this.oldBestAlloGrades, selected);
      }
    }
  }

  displayBoxes(type: string){
    if(type === "genresSimples"){
      this.displayGenres = !this.displayGenres;
      this.displayGenresAvance = false;
      this.displayRealisateurs = false;
      this.displayActeurs = false;
    }else if(type === "genresAvances"){
      this.displayGenresAvance = !this.displayGenresAvance;
      this.displayGenres = false;
      this.displayRealisateurs = false;
    this.displayActeurs = false;
    }else if(type === "reals"){
      this.displayRealisateurs = !this.displayRealisateurs;
      this.displayGenres = false;
      this.displayGenresAvance = false;
      this.displayActeurs = false;
    }else if(type === "acteurs"){
      this.displayActeurs = !this.displayActeurs;
      this.displayGenres = false;
      this.displayGenresAvance = false;
      this.displayRealisateurs = false;
    }
  }

  getUpperForFirstLetter(type: string){
    let indexSpace = type.indexOf(" ");
    if(indexSpace === -1){      
      return type[0].toUpperCase()+type.substring(1);
    }else {
      return type[0].toUpperCase()+type.substring(1, indexSpace) +
      " " + type[indexSpace+1].toUpperCase()+type.substring(indexSpace+2);
    }
  }

}
