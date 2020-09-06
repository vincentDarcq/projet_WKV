import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';
import { Note } from '../models/note';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  wsUrl: string;
  private notes : Array<Note>;
  private bestMovies : Array<Movie>;
  private note: Number;

  constructor(private httpClient: HttpClient) { 
    this.notes = new Array();
    this.bestMovies = new Array();
    this.wsUrl = ENV.apiUrl + '/notes';
  }

  public getNotes(): Array<Note>{
    this.notes.splice(0, this.notes.length)
    this.httpClient.get(this.wsUrl)
      .subscribe((list: Array<Note>) => {
        this.notes.push(...list)
      });
    return this.notes;
  }

  public getBestNotes(): Array<Movie>{
    this.notes.splice(0, this.notes.length);
    this.httpClient.get(this.wsUrl + `/best`)
      .subscribe((list: Array<Movie>) => {
        this.bestMovies.push(...list);
      }
      );
    return this.bestMovies;
  }

  public getNoteForMovie(idmovie: Number): Number {
    this.httpClient.get(this.wsUrl + `/movie` + `/${idmovie}`)
    .subscribe((note: Number) => {
      this.note = note;
      return this.note;
    });
    return this.note;
  }

  public getNoteByUserForMovie(idmovie: Number, iduser: Number){
    for(let note of this.notes){
      if(note.user.id === iduser && note.movie.id === idmovie){
        this.note = note.note;
      }else {
        this.note = -1;
      }
    }
    return this.note;
  }

  public giveMarkForMovie(idmovie: Number, iduser: Number, mark: Number){
    this.httpClient.post<Number>(this.wsUrl + `/movie` + `/${idmovie}` + `/${iduser}`, mark)
    .subscribe((note: Number) => {
      this.note = note;
    });
    return this.note;
  }

  public getNote(id: Number): Number {
    let comp = 0;
    let total = 0;
    for(let note of this.notes){
      if(note.movie.id === id){
        total += note.note;
        comp ++;
      }
    }
    if(total != 0){
      return total/comp;
    }else {
      return -1;
    }
  }

}
