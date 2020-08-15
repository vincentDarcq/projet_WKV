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

  private movies: Array<Movie>;
  private bestMovie: Movie;
  private bestHeightMovies: Array<Movie>;
  private bestGrades: Array<Movie>;
  private movieSearched: Array<Movie>;
  private moviesExcluded: Array<Movie>;
  private genres: Array<string>;
  private genresSimple: Array<string> = ["Animation", "Biopic", "Comédie", "Documentaire", 
    "Drame", "Histoire", "Thriller", "Epouvante-Horreur", "Science fiction", "Aventure"];
  private genresAvance: Array<string>;
  private avances : Array<string>;
  private realisateurs: Array<string>;
  private tenReals: Array<string>;
  private tenR: Array<string>;
  private tenActors: Array<string>;
  private tenA: Array<string>;
  private actors: Array<string>;
  private genresSelected: Array<string>;
  private realisateursSelected: Array<string>;
  private actorsSelected: Array<string>;
  private currentUser: User;
  private notes: Array<Note>;
  private exclusion: boolean = true;
  private displayGenres: boolean = false;
  private displayGenresAvance: boolean = false;
  private displayRealisateurs: boolean = false;
  private displayActeurs: boolean = false;
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
    this.genresAvance = new Array();
    this.realisateursSelected = new Array();
    this.actorsSelected = new Array();
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }  
  
  ngOnInit() {   
    this.genresAvance = ["Guerre", "Policier", "Jeunesse", "Fantasy", "Action",
    "Musical", "Romance", "Super Héros", "Gore", "Français"]
    this.avances = ["Guerre", "Policier", "Jeunesse", "Fantasy", "Action",
    "Musical", "Romance", "Super Héros", "Gore", "Français"]
    this.tenReals = ["Steven Spielberg", "Michael Bay", "Tim Burton", "Ron Howard",
    "James Cameron", "Ridley Scott", "Chris Colombus", "Guy Ritchie", "Martin Scorcese", "David Fincher"]
    this.tenR = ["Steven Spielberg", "Michael Bay", "Tim Burton", "Ron Howard",
    "James Cameron", "Ridley Scott", "Chris Colombus", "Guy Ritchie", "Martin Scorcese", "David Fincher"]
    this.tenActors = ["Al Pacino", "Robert De Niro", "Leonardo DiCaprio", "Kevin Spacey",
    "Marlon Brando", "Clint Eastwood", "Morgan Freeman", "Johnny Depp", "Jack Nicholson", "Joaquin Phoenix"]
    this.tenA = ["Al Pacino", "Robert De Niro", "Leonardo DiCaprio", "Kevin Spacey",
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
    this.exclusion = !this.exclusion
  }

  searched(searchValue: string){
    this.genreFound = false
    this.realFound = false
    this.actorFound = false
    if(this.genres.indexOf(searchValue) !== -1){
      this.genreFound = true;
      this.genreInput = searchValue
    }else if(this.realisateurs.indexOf(searchValue) !== -1){
      this.realFound = true
      this.realInput = searchValue
    }else if(this.actors.indexOf(searchValue) !== -1){
      this.actorFound = true
      this.actorInput = searchValue
    }
  }

  selected(selected: string){  
    if(this.genreInput === selected){
      this.genreFound = false
    }else if(this.realInput === selected){
      this.realFound = false
    }else if(this.actorInput === selected){
      this.actorFound = false
    }
    if(this.genres.indexOf(selected.toLowerCase()) !== -1){
      if(this.genresSimple.indexOf(selected) !== -1){
        this.genresSimple.splice(this.genresSimple.indexOf(selected), 1)
      }
      if(this.genresAvance.indexOf(selected) !== -1){
        this.genresAvance.splice(this.genresAvance.indexOf(selected), 1)
      }
      this.genresSelected.push(selected)
      if(this.exclusion){
        this.movies = this.movieService.getMovieByExclusionGenres(this.genresSelected)
      } else{
        this.movies = this.movieService.getMovieByInclusionGenres(this.genresSelected)
      }
    }else if(this.realisateurs.indexOf(selected.toLowerCase()) !== -1){
      if(this.tenReals.indexOf(selected) !== -1){
        this.tenReals.splice(this.tenReals.indexOf(selected), 1)
      }
      this.realisateursSelected.push(selected)
      if(this.exclusion){
        this.movies = this.movieService.getMovieByExclusionReals(this.realisateursSelected);
      }else {
        this.movies = this.movieService.getMovieByInclusionReals(this.realisateursSelected);
      }
    }else if(this.actors.indexOf(selected.toLowerCase()) !== -1){
      if(this.tenActors.indexOf(selected) !== -1){
        this.tenActors.splice(this.tenActors.indexOf(selected), 1)
      }
      this.actorsSelected.push(selected)
      if(this.exclusion){
        this.movies = this.movieService.getMovieByExclusionActors(this.actorsSelected);
      }else {
        this.movies = this.movieService.getMovieByInclusionActors(this.actorsSelected);
      }
    }
  }

  restored(restored: string){
    var indexGenre = this.genresSelected.indexOf(restored)
    var indexReal = this.realisateursSelected.indexOf(restored)
    var indexActor = this.actorsSelected.indexOf(restored)
    if(indexGenre !== -1){
      if(this.avances.indexOf(restored) !== -1){
        this.genresAvance.push(restored)
      }else {
        this.genresSimple.push(restored)
      }
      this.genresSelected.splice(this.genresSelected.indexOf(restored), 1)
      if(this.exclusion){
        this.movies = this.movieService.getMovieByExclusionGenres(this.genresSelected);
      } else{
        this.movies = this.movieService.getMovieByInclusionGenres(this.genresSelected);
      }
    }else if(indexReal !== -1){
      if(this.tenR.indexOf(restored) !== -1){
        this.tenReals.push(restored)
      }
      this.realisateursSelected.splice(this.realisateursSelected.indexOf(restored), 1)
      if(this.exclusion){
        this.movies = this.movieService.getMovieByExclusionReals(this.realisateursSelected);
      }else {
        this.movies = this.movieService.getMovieByInclusionReals(this.realisateursSelected);
      }
    }else if(indexActor !== -1){
      if(this.tenA.indexOf(restored) !== -1){
        this.tenActors.push(restored)
      }
      this.actorsSelected.splice(this.actorsSelected.indexOf(restored), 1)
      if(this.exclusion){
        this.movies = this.movieService.getMovieByExclusionActors(this.actorsSelected);
      }else {
        this.movies = this.movieService.getMovieByInclusionActors(this.actorsSelected);
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

  showGenresExclus(){
    document.getElementById("genresExclus").style.display = "block";
  }

  hideGenresExclus(){
    document.getElementById("genresExclus").style.display = "none";
  }

  showRealisateurs(){
    this.displayRealisateurs = true;
  }

  hideRealisateurs(){
    this.displayRealisateurs = false;
  }

  showRealsExclus(){
    document.getElementById("realsExclus").style.display = "block";
  }

  hideRealsExclus(){
    document.getElementById("realsExclus").style.display = "none";
  }

  showActeurs(){
    this.displayActeurs = true;
  }

  hideActeurs(){
    this.displayActeurs = false;
  }

  showActorsExclus(){
    document.getElementById("actorsExclus").style.display = "block";
  }

  hideActorsExclus(){
    document.getElementById("actorsExclus").style.display = "none";
  }

}
