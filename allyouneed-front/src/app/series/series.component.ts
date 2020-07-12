import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../services/series.service';
import { Serie } from '../models/serie';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  private modeExcSimple: Boolean;
  private modeExcAvancee: Boolean;
  private exclusionSimple: Boolean;
  private exclusionAvancee: Boolean;
  private series: Array<Serie>;
  private seriesByExclusionSimple: Array<Serie>;
  private seriesByExclusionAvancee: Array<Serie>;
  private genres: Array<String>;
  private genresExclus: Array<String>;

  constructor(private SerieService: SeriesService) {
    this.modeExcSimple = true;
    this.modeExcAvancee = false;
    this.exclusionSimple = false;
    this.exclusionAvancee = false;
    this.series = this.SerieService.getSeries();
    this.genres = this.SerieService.getGenres();
    this.genresExclus = new Array();
  }

  ngOnInit() {
  }

  switchExclusionMode(){
    if(this.modeExcSimple){
      this.modeExcSimple = false;
      this.modeExcAvancee = true;
    }else {
      this.modeExcSimple = true;
      this.modeExcAvancee = false;
    }
  }

  genreSelected(){
    if(this.modeExcSimple){
      this.exclusionSimple = true;
      this.genresExclus.splice(0, this.genresExclus.length);
      for (let genre of this.genres){
        if($("#"+genre).prop("checked")){
          this.genresExclus.push(genre);
        }
      }
      this.seriesByExclusionSimple = this.SerieService.getSerieByExclusionSimple(this.genresExclus);
    }else if(this.modeExcAvancee){
      this.exclusionAvancee = true;
      this.genresExclus.splice(0, this.genresExclus.length);
      for (let genre of this.genres){
        if($("#"+genre).prop("checked")){
          this.genresExclus.push(genre);
        }    
      }
      this.seriesByExclusionAvancee = this.SerieService.getSerieByExclusionAvancee(this.genresExclus);
    }
  }

}
