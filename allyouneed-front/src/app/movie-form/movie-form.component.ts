import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { NgForm } from '@angular/forms';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  private newMovie: Movie;
  private id: Number;

  constructor(private movieService: MoviesService,
              private route: ActivatedRoute,
              private router: Router) { 
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id){
      this.newMovie = this.movieService.getMovie(this.id);
    }else {
      this.newMovie = new Movie();
    }
  }

  ngOnInit() {
  }

  validateForm() {
    if (this.id) {
      this.movieService.updateMovie(this.newMovie);
      this.router.navigate(['/movie', this.id ]);
    } else {
      this.movieService.createMovie(this.newMovie);
      this.router.navigate(['']);
    }
  }
}
