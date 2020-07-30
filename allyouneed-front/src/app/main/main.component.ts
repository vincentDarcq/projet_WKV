import { Component, OnInit, DoCheck } from '@angular/core';
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
  private realisateursExclus: Array<string>;
  private actorsExclus: Array<string>;
  private currentUser: User;
  private notes: Array<Note>;
  private exclusion: boolean = true;
  private displayGenres: boolean = false;
  private displayRealisateurs: boolean = false;
  private displayActeurs: boolean = false;
  private displayMovie: boolean = false;
  private bestMoviesChecked: boolean = false;
  search: string;
  searching: boolean = false;

  constructor(private movieService: MoviesService,
              private noteService: NotesService) {

    this.moviesExcluded = new Array();
    this.movieSearched = new Array();
    this.bestHeightMovies = new Array();
    this.bestGrades = new Array();
    this.genresSelected = new Array();
    this.realisateursExclus = new Array();
    this.actorsExclus = new Array();
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  
  ngOnInit() {    
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
    this.exclusion = !this.exclusion;
  }

  genreSelected(genreSelected: string){    
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
        var index = this.genresSelected.indexOf(genre)
        this.genresSelected.splice(index, 1)
      }
    }
    if(this.exclusion){
      this.movies = this.movieService.getMovieByExclusionGenres(this.genresSelected);
    } else{
      this.movies = this.movieService.getMovieByInclusionGenres(this.genresSelected);
    }  }

  realSelected(realSelected: string){
    for (let real of this.realisateurs){
      if(real === realSelected){
        this.realisateursExclus.push(real);
        var index = this.realisateurs.indexOf(real)
        this.realisateurs.splice(index, 1)
      }
    }
    if(this.exclusion){
      this.movies = this.movieService.getMovieByExclusionReals(this.realisateursExclus);
    }else {
      this.movies = this.movieService.getMovieByInclusionReals(this.realisateursExclus);
    }
  }

  realRestored(realRestored: string){
    for (let real of this.realisateursExclus){
      if(real === realRestored){
        this.realisateurs.push(real);
        var index = this.realisateursExclus.indexOf(real)
        this.realisateursExclus.splice(index, 1)
      }
    }
    if(this.exclusion){
      this.movies = this.movieService.getMovieByExclusionReals(this.realisateursExclus);
    }else {
      this.movies = this.movieService.getMovieByInclusionReals(this.realisateursExclus);
    }
  }

  actorSelected(actorSelected: string){
    for (let actor of this.actors){
      if(actor === actorSelected){
        this.actorsExclus.push(actor);
        var index = this.actors.indexOf(actor)
        this.actors.splice(index, 1)
      }
    }
    if(this.exclusion){
      this.movies = this.movieService.getMovieByExclusionActors(this.actorsExclus);
    }else {
      this.movies = this.movieService.getMovieByInclusionActors(this.actorsExclus);
    }
  }

  actorRestored(actorRestored: string){
    for (let actor of this.actorsExclus){
      if(actor === actorRestored){
        this.actors.push(actor);
        var index = this.actorsExclus.indexOf(actor)
        this.actorsExclus.splice(index, 1)
      }
    }
    this.movies = this.movieService.getMovieByExclusionActors(this.actorsExclus);
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
