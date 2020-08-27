import { Injectable } from '@angular/core';
import { Serie } from '../models/serie';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private plusieurs: number;
  private nb: number;
  private nbGenres: number;
  private present: Boolean;
  private index: Number;
  private series : Array<Serie>;
  private seriesByExclusionGenres: Array<Serie>;
  private seriesByInclusionGenres: Array<Serie>;
  private genres : Array<String>;
  wsUrl: string;

  constructor(private httpClient: HttpClient) {
    this.series = new Array();
    this.seriesByExclusionGenres = new Array();
    this.seriesByInclusionGenres = new Array();
    this.genres = new Array();
    this.wsUrl = ENV.apiUrl + '/series';
   }

   public getSeries(): Array<Serie> {
    this.series.splice(0, this.series.length);
    this.httpClient.get(this.wsUrl)
      .subscribe((list: Array<Serie>) => 
      this.series.push(...list)
      );
    return this.series;
  }

  public getSerie(id: Number): Serie {
    const index = this.getIndex(id);
    if (index >= 0) {
      return this.series[index];
    }
  }
  
  public createSerie(serie: Serie) {
      this.httpClient.post<Serie>(this.wsUrl, serie)
      .subscribe((serieFromJee) => this.series.push(new Serie(serieFromJee.titre,
        serieFromJee.synopsis, serieFromJee.id, serieFromJee.genre, serieFromJee.casting,
        serieFromJee.creator, serieFromJee.seasons, serieFromJee.cov, serieFromJee.ba))
        );
  }

  public updateSerie(serie: Serie) {
    console.log(serie)
    this.httpClient.put<Serie>(this.wsUrl + `/${serie.id}`, serie)
      .subscribe((serieFromJee) => {
        const index = this.getIndex(serie.id);
        if (index >= 0) {
          this.series.splice(index, 1, new Serie(serieFromJee.titre,
            serieFromJee.synopsis, serieFromJee.id, serieFromJee.genre, serieFromJee.casting,
            serieFromJee.creator, serieFromJee.seasons, serieFromJee.cov, serieFromJee.ba));
        }
      });
  }


  public getGenres(): Array<String> {
    this.genres.splice(0, this.genres.length);
    this.httpClient.get(this.wsUrl + `/genres`)
      .subscribe((list: Array<String>) => 
      this.genres.push(...list)
      );
    return this.genres;
  }

  public getSerieByExclusionGenres(genres: Array<String>): Array<Serie> {
    this.seriesByExclusionGenres.splice(0, this.seriesByExclusionGenres.length);
    for(let serie of this.series) {
      this.present = false;
      for(let genre of genres) {
        if(JSON.stringify(serie.genre) != "") {
          this.index = serie.genre.toLowerCase().indexOf(genre.toLowerCase());
          if(this.index != -1) {
            this.present = true;
          }
        }				
      }
      if(!this.present) {
        this.seriesByExclusionGenres.push(serie);
      }
    }
    return this.seriesByExclusionGenres;
  }

  public getSerieByInclusionGenres(genres: Array<String>): Array<Serie> {
    this.seriesByInclusionGenres.splice(0, this.seriesByInclusionGenres.length);
    for(let serie of this.series) {
      this.present = false;
      for(let genre of genres) {
        if(JSON.stringify(serie.genre) != "") {
          this.index = serie.genre.toLowerCase().indexOf(genre.toLowerCase());
          if(this.index != -1) {
            this.seriesByInclusionGenres.push(serie)
          }
        }				
      }
    }
    if(genres.length >= 1){
      return this.seriesByInclusionGenres;
    }else {
      return this.series;
    }
  }

  private getIndex(id: Number): number {
    return this.series.findIndex(
      (movie) => movie.id === id
    );
  }
}
