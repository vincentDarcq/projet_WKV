import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../models/movie';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
export class MovieComponent implements OnInit, OnDestroy {

  private index: number;
  private isFavori: boolean;
  private idmovie: Number;
  private movie: Movie;
  private currentUser: User;
  private comments: Array<Comment>;
  private comment: string;
  private noteMovie: Number;
  private noteUserFromBack: Number;
  private noteUser: Number;

  constructor(private movieService: MoviesService,
              private commentMovieService: CommentsService,
              private noteMovieService: NotesService,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private router: Router) {  }

  ngOnInit() {
    this.idmovie = Number(sessionStorage.getItem('idmovie'))
    //On récupère l'id du film dans l'url de navigation
    if(this.idmovie === 0){
      this.idmovie = Number(this.route.snapshot.params.id);
      sessionStorage.setItem('idmovie', this.idmovie.toString())
    }
    //On récupère le film via l'id récupérée au dessus
    this.movie = this.movieService.getMovie(this.idmovie);
    //On récupère tous les commentaires
    this.comments = this.commentMovieService.getCommentsMovie(this.idmovie);
    //On récupère la note moyenne du film
    this.noteMovie = this.noteMovieService.getNote(this.idmovie);
    //On récupère l'utilisateur s'il y en a un de connecté
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    //Si un user est connecté
    if(this.currentUser !== null){
      //on check s'il a donné une note au film
      this.noteUserFromBack = this.noteMovieService.getNoteByUserForMovie(this.idmovie, this.currentUser.id);
      //on check si ce film est dans ses favoris
      if(this.currentUser.filmsfavoris){
        this.index = this.currentUser.filmsfavoris.indexOf(this.movie.titre);
      }
    }
    //Si le film est dans les favoris du user, on set la variable à true
    if(typeof this.index !== 'undefined' && this.index !== -1){
      this.isFavori = true;
    }
  }

  ngOnDestroy(){
    sessionStorage.removeItem('idmovie')
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
}
