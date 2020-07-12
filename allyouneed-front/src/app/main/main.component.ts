import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import * as $ from 'jquery';
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
  private moviesExcluded: Array<Movie>;
  private genres: Array<string>;
  private realisateurs: Array<string>;
  private actors: Array<string>;
  private genresExclus: Array<string>;
  private realisateursExclus: Array<string>;
  private actorsExclus: Array<string>;
  private currentUser: User;
  private notes: Array<Note>;
  private displayGenres: boolean = false;
  private displayGenresExclus: boolean = false;
  private displayRealisateurs: boolean = false;
  private displayActeurs: boolean = false;
  private displayMovie: boolean = false;

  constructor(private movieService: MoviesService,
              private noteService: NotesService) {

    this.moviesExcluded = new Array();
    this.genresExclus = new Array();
    this.realisateursExclus = new Array();
    this.actorsExclus = new Array();
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }
  ngDoCheck(): void {
  }

  ngOnInit() {
    this.movies = this.movieService.getMovies();
    this.genres = this.movieService.getGenres();
    this.actors = this.movieService.getActors();
    this.realisateurs = this.movieService.getRealisateurs();
    this.notes = this.noteService.getNotes();
  }

  genreSelected(){
    this.genresExclus.splice(0, this.genresExclus.length);
    for (let genre of this.genres){
      if($("#"+genre).prop("checked")){
        this.genresExclus.push(genre);
      }
    }
    this.movies = this.movieService.getMovieByExclusionGenres(this.genresExclus);
  }

  public showGenres(){
    this.displayGenres = true;
  }

  public hideGenres(){
    this.displayGenres = false;
  }

  public showGenresExclus(){
    this.displayGenresExclus = true;
  }

  public hideGenresExclus(){
    this.displayGenresExclus = false;
  }

  public showRealisateurs(){
    this.displayRealisateurs = true;
  }

  public hideRealisateurs(){
    this.displayRealisateurs = false;
  }

  public showActeurs(){
    this.displayActeurs = true;
  }

  public hideActeurs(){
    this.displayActeurs = false;
  }

  public showMovie(){
    this.displayMovie = true;
  }

  public hideMovie(){
    this.displayMovie = false;
  }

}
