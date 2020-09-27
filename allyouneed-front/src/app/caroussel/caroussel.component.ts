import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Movie } from '../models/movie';
import { Section } from '../models/section';
import { Sections } from '../models/sections';

@Component({
  selector: 'app-caroussel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.css']
})
export class CarousselComponent implements OnInit, DoCheck {

  @Input() inputMovies
  movies: Array<Movie>
  moviesSize: number
  changed: boolean
  sections: Sections
  sectionsSize: number
  activeSection: Section
  item: Movie
  show: boolean = false

  constructor() {
    this.movies = new Array()
    this.item = new Movie()
    this.sections = new Sections();
   }

  ngOnInit(): void {
    this.movies = this.inputMovies
    this.moviesSize = this.movies.length
    this.changed = true
    this.fillSections()
  }

  ngDoCheck(){
    this.movies = this.inputMovies
    if(this.moviesSize !== this.movies.length){
      this.moviesSize = this.movies.length
      this.changed = true
      this.fillSections()
    }
  }

  fillSections(){
    this.sections = new Sections();
    let arraySection = new Array<Movie>()
    let stringSection = ""
    for(let i=1; i<this.movies.length; i++){
      if(arraySection.length < 4){
        arraySection.push(this.movies[i])
      }else{
        stringSection = JSON.stringify(arraySection)
        this.sections.push(JSON.parse(stringSection))
        arraySection.splice(0, arraySection.length)
        arraySection.push(this.movies[i])
      }
    }
    this.sectionsSize = this.sections.sections.length
    if(this.changed){
      this.activeSection = this.sections.sections[0]
    }
    this.changed = false
  }

  showDetails(movie: Movie){
    this.show = !this.show
    this.item = movie
  }

  hideDetails(){
    this.show = !this.show
    this.item = null
  }

  prevSection(){
    for(let i=0; i<this.sections.sections.length; i++){
      if(this.activeSection === this.sections.sections[i]){
        this.activeSection = this.sections.sections[i-1]
      }
    }
  }

  nextSection(){
    for(let i=0; i<this.sections.sections.length; i++){
      if(this.activeSection === this.sections.sections[i]){
        this.activeSection = this.sections.sections[i+1]
        break
      }
    }
  }
}
