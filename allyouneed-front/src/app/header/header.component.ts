import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { AuthService } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private user: User;
  loggedIn: boolean;

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loginService.getCurrentUser().subscribe(user => { 
      this.user = user;
    });
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

  signOutwithFB(): void {
    this.authService.signOut();
  }

}
