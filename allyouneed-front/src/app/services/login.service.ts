import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';
import { User } from '../models/user';
import { Subject, Observable } from 'rxjs';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  wsUrl: string;
  private users: Array<User>;
  private currentUser = new Subject<any>();
  private comments: Array<Comment>;

  constructor(private httpClient: HttpClient,
              private alertService: AlertService) { 
    this.wsUrl = ENV.apiUrl + '/users';
    this.users = new Array();
  }

  public getUsers(): Array<User> {
    this.users.splice(0, this.users.length);
    this.httpClient.get(this.wsUrl)
      .subscribe((list: Array<User>) => this.users.push(...list)
      );
    return this.users;
  }

  public register(user: User, facebook?: string){
    this.httpClient.post<String>(this.wsUrl, user)
    .subscribe((status) => {
      if(status == "500"){
        if(facebook){} else{
          this.alertService.error("Un compte avec cette adresse email existe déjà") 
        }
      }else {
        if(facebook){
          this.alertService.success("Connexion avec Facebook réussie");
        }else {
        this.alertService.success("Compte enregistré avec succès");
        }
      }
    });
  }

  public editUser(user: User){
    this.httpClient.put<User>(this.wsUrl+ `/${user.id}`, user)
    .subscribe((userFromJee) => {
      const index = this.getIndex(user.id);
        if (index >= 0) {
          this.users.splice(index, 1, new User(userFromJee.pseudonyme, userFromJee.password,
            userFromJee.email, userFromJee.question, userFromJee.reponse, userFromJee.id,
            userFromJee.filmsfavoris, userFromJee.seriesfavoris));
          this.logout();
          this.login(userFromJee);
        }
      })
  }

  public login(user: User){
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser.next(user);
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.next();
  }

  public getCurrentUserAsObs(): Observable<any> {
    return this.currentUser.asObservable()
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'))
  }

  private getIndex(id: Number): number {
    return this.users.findIndex(
      (movie) => movie.id === id
    );
  }

}
