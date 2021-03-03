import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { LoginService } from '../services/login.service';
import { CommentsService } from '../services/comments.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  index: number;
  isFavori: boolean;
  idmovie: Number;
  movie: Movie;
  currentUser: User;
  comments: Array<Comment>;
  comment: string;
  noteMovie: Number;
  noteUserFromBack: Number;
  noteUser: Number;

  constructor(private movieService: MoviesService,
              private commentMovieService: CommentsService,
              private noteMovieService: NotesService,
              private activatedRoute: ActivatedRoute,
              private loginService: LoginService) { 
    }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.idmovie = Number(params.get('id'));
    });
    this.movieService.movies.subscribe( movies => {
      const id = movies.findIndex((movie) => this.idmovie === movie.id);
      this.movie = movies[id];
      console.log(this.movie);
      this.comments = this.commentMovieService.getCommentsMovie(id);
    })
    this.noteMovieService.notes.subscribe( notes => {
      if(notes.length > 0){
        const id = notes.findIndex((note) => this.idmovie === note.movie.id);
        if(id !== -1){
          this.noteMovie = notes[id].note;
        }
      }
    })
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser !== null){
      this.noteUserFromBack = this.noteMovieService.getNoteByUserForMovie(this.idmovie, this.currentUser.id);
      if(this.currentUser.filmsfavoris){
        this.index = this.currentUser.filmsfavoris.indexOf(this.movie.titre);
      }
    }
    if(typeof this.index !== 'undefined' && this.index !== -1){
      this.isFavori = true;
    }
  }

  ajouterFavoris(){
    if(this.currentUser.filmsfavoris === null || this.currentUser.filmsfavoris === ""){
      this.currentUser.filmsfavoris = this.movie.titre; 
    }else {
      this.currentUser.filmsfavoris += ", " + this.movie.titre;
    }
    this.loginService.editUser(this.currentUser);
    this.isFavori = true;
  }

  supprimerFavoris(){
    this.index = this.currentUser.filmsfavoris.indexOf(this.movie.titre);
    if(this.index == 0){
      this.currentUser.filmsfavoris =
      this.currentUser.filmsfavoris.substring(this.movie.titre.length + 2)
    }else if(this.currentUser.filmsfavoris.substring(this.index) !== this.movie.titre){
      this.currentUser.filmsfavoris = 
      this.currentUser.filmsfavoris.substring(0, this.index)+this.currentUser.filmsfavoris.substring(this.index+this.movie.titre.length+2); 
    }else {
      this.currentUser.filmsfavoris = 
      this.currentUser.filmsfavoris.substring(0, this.index-2); 
    }
    this.loginService.editUser(this.currentUser);
    this.isFavori = false;
  }

  addComment(){
    this.commentMovieService.postCommentMovie(this.comment, this.currentUser.id, this.idmovie);
    this.comment = "";
  }

  suppComment(id: Number){
    this.commentMovieService.suppCommentMovie(id);
  }

  giveMark(){
    this.noteMovieService.giveMarkForMovie(this.idmovie, this.currentUser.id, this.noteUser);
    this.noteUserFromBack = this.noteUser;
  }

  onRateChange(score){
    this.noteUser = score;
  }
}
