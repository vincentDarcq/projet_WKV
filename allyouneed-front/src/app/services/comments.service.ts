import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  wsUrl: string;
  private comments: Array<Comment>;

  constructor(private httpClient: HttpClient) {
    this.wsUrl = ENV.apiUrl + '/comments';
    this.comments = new Array();
  }

  public getCommentsMovie(idmovie: Number): Array<Comment> {
    this.comments.splice(0, this.comments.length);
    this.httpClient.get(this.wsUrl + `/movie` + `/${idmovie}`)
      .subscribe((list: Array<Comment>) => {
        this.comments.push(...list);
      });
    return this.comments;
  }

  public postCommentMovie(comment: string, iduser: Number, idmovie: Number){
    this.httpClient.post<Comment>(this.wsUrl + `/movie` + `/${iduser}` + `/${idmovie}`, comment)
    .subscribe((comFromJee) => {
      this.comments.push(comFromJee);
      console.log("reponse com "+comFromJee);
    }
    )}

  public suppCommentMovie(id: Number){
    this.httpClient.delete(this.wsUrl + `/movie` + `/${id}`)
    .subscribe(() => 
    {const index = this.getIndex(id);
      if (index >= 0) {
        this.comments.splice(index, 1);
      }
    });
  }

  private getIndex(id: Number): number {
    return this.comments.findIndex(
      (comment) => comment.id === id
    );
  }
}
