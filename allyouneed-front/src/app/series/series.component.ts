import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../services/series.service';
import { Serie } from '../models/serie';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit{

  modeExcSimple: Boolean;
  modeExcAvancee: Boolean;
  exclusionSimple: Boolean;
  exclusionAvancee: Boolean;
  series: Array<Serie>;
  seriesByExclusionSimple: Array<Serie>;
  seriesByExclusionAvancee: Array<Serie>;
  genres: Array<String>;
  genresExclus: Array<String>;
  genresSimple: Array<string> = ["Animation", "Biopic", "Comédie", "Documentaire", 
  "Drame", "Histoire", "Thriller", "Epouvante-Horreur", "Science fiction", "Aventure"];
  genresAvance: Array<string>;
  avances: Array<string>;
  genreFound: boolean = false;
  genresSelected: Array<string>;
  realisateursSelected: Array<string>;
  actorsSelected: Array<string>;
  exclusion: boolean = true;
  displayGenres: boolean = false;
  displayGenresAvance: boolean = false;
  displayRealisateurs: boolean = false;
  displayActeurs: boolean = false;

  constructor(private serieService: SeriesService) {
    this.modeExcSimple = true;
    this.modeExcAvancee = false;
    this.exclusionSimple = false;
    this.exclusionAvancee = false;
    this.genresExclus = new Array();
    this.genresSelected = new Array();
    this.realisateursSelected = new Array();
    this.actorsSelected = new Array();
  }

  ngOnInit() {
    this.genresAvance = ["Guerre", "Policier", "Jeunesse", "Fantasy", "Action",
    "Musical", "Romance", "Super Héros", "Gore", "Français"]
    this.avances = ["Guerre", "Policier", "Jeunesse", "Fantasy", "Action",
    "Musical", "Romance", "Super Héros", "Gore", "Français"]
    this.series = this.serieService.getSeries();
    this.genres = this.serieService.getGenres();    
  }

  switchMode(){
    this.exclusion = !this.exclusion
  }

  selected(selected: string){
    if(this.genresSimple.indexOf(selected) !== -1){
      this.genresSimple.splice(this.genresSimple.indexOf(selected), 1)
    }
    if(this.genresAvance.indexOf(selected) !== -1){
      this.genresAvance.splice(this.genresAvance.indexOf(selected), 1)
    }
    this.genresSelected.push(selected)
    if(this.exclusion){
      this.series = this.serieService.getSerieByExclusionGenres(this.genresSelected)
    } else{
      this.series = this.serieService.getSerieByInclusionGenres(this.genresSelected)
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
      console.log(this.genresSelected)
      if(this.exclusion){
        this.series = this.serieService.getSerieByExclusionGenres(this.genresSelected);
      } else{
        this.series = this.serieService.getSerieByInclusionGenres(this.genresSelected);
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
