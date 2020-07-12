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
  private seriesByExclusionSimple: Array<Serie>;
  private seriesByExclusionAvancee: Array<Serie>;
  private genres : Array<String>;
  wsUrl: string;

  constructor(private httpClient: HttpClient) {
    this.series = new Array();
    this.seriesByExclusionSimple = new Array();
    this.seriesByExclusionAvancee = new Array();
    this.genres = new Array();
    this.wsUrl = ENV.apiUrl + '/series';
   }

   public getSeries(): Array<Serie> {
    this.series.splice(0, this.series.length);
    // envoyer la requête
    this.httpClient.get(this.wsUrl)
      // donner le callback pour traiter la réponse.
      .subscribe((list: Array<Serie>) => this.series.push(...list)
      );
    return this.series;
  }

  public getSerie(id: Number): Serie {
    const index = this.getIndex(id);
    if (index >= 0) {
      return this.series[index];
    }
  }
  
  public createSerie(movie: Serie) {
    const newMovie = new Serie(movie.titre, movie.synopsis, null);
      this.httpClient.post<Serie>(this.wsUrl, newMovie)
      .subscribe((serieFromJee) => this.series.push(new Serie(serieFromJee.titre,
        serieFromJee.synopsis, serieFromJee.id, serieFromJee.genre, serieFromJee.casting,
        serieFromJee.createur, serieFromJee.saisons, serieFromJee.cov, serieFromJee.pegi,
        serieFromJee.avertissement))
        );
  }

  public updateSerie(serie: Serie) {
    this.httpClient.put<Serie>(this.wsUrl + `/${serie.id}`, serie)
      .subscribe((serieFromJee) => {
        const index = this.getIndex(serie.id);
        if (index >= 0) {
          this.series.splice(index, 1, new Serie(serieFromJee.titre,
            serieFromJee.synopsis, serieFromJee.id, serieFromJee.genre, serieFromJee.casting,
            serieFromJee.createur, serieFromJee.saisons, serieFromJee.cov, serieFromJee.pegi,
            serieFromJee.avertissement));
        }
      });
  }


  public getGenres(): Array<String> {
    this.genres.splice(0, this.genres.length);
    // envoyer la requête
    this.httpClient.get(this.wsUrl + `/genres`)
      // donner le callback pour traiter la réponse.
      .subscribe((list: Array<String>) => this.genres.push(...list)
      );
    return this.genres;
  }

  public getSerieByExclusionSimple(genres: Array<String>): Array<Serie> {
    this.seriesByExclusionSimple.splice(0, this.seriesByExclusionSimple.length);
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
        this.seriesByExclusionSimple.push(serie);
      }
    }
    return this.seriesByExclusionSimple;
  }

  public getSerieByExclusionAvancee(genres: Array<String>): Array<Serie>{
    this.seriesByExclusionAvancee.splice(0, this.seriesByExclusionAvancee.length);
    for(let movie of this.series) {
      this.nbGenres = 0;
      for(let genre of genres) {
        if(JSON.stringify(movie.genre) != "") {
          this.index = movie.genre.toLowerCase().indexOf(genre.toLowerCase());
          if(this.index != -1) {
            this.nbGenres ++;
          }
        }
      }
      if(this.nbGenres != this.nombreAttributs(movie.genre)){
        this.seriesByExclusionAvancee.push(movie);
      }
    }
    return this.seriesByExclusionAvancee;
  }

  public nombreAttributs(attributs: String): Number {
    this.nb = 1;
    this.plusieurs = attributs.indexOf(", ");
    if(this.plusieurs == -1) {
      return this.nb;
    }else {
      while(this.plusieurs != -1) {
        attributs = attributs.substring(this.plusieurs+2);
        this.plusieurs = attributs.indexOf(", ");
        this.nb ++;
      }
      return this.nb;
    }
  }

  private getIndex(id: Number): number {
    return this.series.findIndex(
      (movie) => movie.id === id
    );
  }
}
