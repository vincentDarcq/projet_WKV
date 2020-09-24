import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie';
import { Section } from '../models/section';
import { Sections } from '../models/sections';

@Component({
  selector: 'app-caroussel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.css']
})
export class CarousselComponent implements OnInit {

  @Input() inputMovies
  movies: Array<Movie>
  sections1: Sections
  sections2: Sections
  item: Movie
  show: boolean = false

  constructor() {
    this.movies = new Array()
    this.item = new Movie()
    this.sections1 = new Sections();
    this.sections2 = new Sections();
   }

  ngOnInit(): void {
    this.movies = this.inputMovies
    let arraySection = new Array<Movie>()
    let stringSection = ""
    for(let i=1; i<this.movies.length; i++){
      if(arraySection.length < 4){
        arraySection.push(this.movies[i])
      }else{
        stringSection = JSON.stringify(arraySection)
        this.sections1.push(JSON.parse(stringSection))
        arraySection.splice(0, arraySection.length)
        arraySection.push(this.movies[i])
      }
    }
  }

  showDetails(movie: Movie){
    this.show = !this.show
    this.item = movie
  }

  hideDetails(){
    this.show = !this.show
    this.item = null
  }
}
