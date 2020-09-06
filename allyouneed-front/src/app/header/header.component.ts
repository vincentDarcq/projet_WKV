import { Component, OnInit, DoCheck, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { AuthService } from "angularx-social-login";
import { Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  user: User;
  loggedIn: boolean;
  @Output() search = new EventEmitter();
  movieSearch: string

  constructor(private loginService: LoginService,
              private movieService: MoviesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.loginService.getCurrentUser()
    this.loginService.getCurrentUserAsObs().subscribe(user => { 
      this.user = user;
    });
  }

  ngDoCheck(){
    this.search.next(this.movieSearch)
  }

  logout(){
    this.authService.authState.subscribe((user) => {
      this.loggedIn = (user != null);
    });
    this.loginService.logout();
    this.router.navigate(['']);
  }

  signOutwithFB(): void {
    this.authService.signOut();
  }

}
