import { Component, OnInit, DoCheck } from '@angular/core';
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

  private user: User;
  loggedIn: boolean;
  public search: string;

  constructor(private loginService: LoginService,
              private movieService: MoviesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loginService.getCurrentUser().subscribe(user => { 
      this.user = user;
    });
  }

  ngDoCheck(){
    this.sendSearchToMain()
  }

  logout(){
    this.authService.authState.subscribe((user) => {
      this.loggedIn = (user != null);
    });
    if(this.loggedIn){
      this.signOutwithFB();
      this.loginService.logout()
    }else {
      this.loginService.logout();
    }
    this.router.navigate(['']);
  }

  sendSearchToMain(){
    this.movieService.setSearch(this.search);
  }

  signOutwithFB(): void {
    this.authService.signOut();
  }

}
