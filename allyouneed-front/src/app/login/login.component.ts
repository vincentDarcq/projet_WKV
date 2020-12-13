import { Component, OnInit, DoCheck } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService, FacebookLoginProvider, SocialUser } from "angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {

  users: Array<User>;
  login: User;
  isUser: boolean;
  fbuser: SocialUser;
  loggedIn: boolean;
  loggedInChecked: boolean = false;
  fbuserIsInBdd: boolean = false;

  constructor(private loginService: LoginService,
              private alertService: AlertService,
              private router: Router,
              private authService: AuthService) {
    this.isUser = false;
    this.login = new User();    
   }

  ngOnInit() {
    this.users = this.loginService.getUsers();
    this.authService.authState.subscribe((user) => {
      console.log(user)
      this.fbuser = user;
      this.loggedIn = (user != null);
    });
  }

  ngDoCheck(){
    if(this.loggedIn && !this.loggedInChecked){
      this.loggedInChecked = true;
      for(let user of this.users){
        //Check si le compte FB est enregistré en BDD
        if(user.email === this.fbuser.email){
          this.fbuserIsInBdd = true;
          this.login = new User(this.fbuser.firstName, this.fbuser.email);
          this.loginService.login(this.login);
        }
      }
      //Si le compte FB n'est pas en BDD, on l'enregistre
      if(!this.fbuserIsInBdd){
        this.login = new User(this.fbuser.firstName, this.fbuser.email);
        this.loginService.register(this.login, "facebook");  
        this.loginService.login(this.login);    
      }
    }
  }

  checkLogin(){
    for (let user of this.users){
      if(user.pseudonyme == this.login.pseudonyme){
        if(user.password == this.login.password){
          this.isUser = true;
          this.login = user;
        }
      }
    }
    if(this.isUser){
      this.loginService.login(this.login);
      this.router.navigate(['']);
    }else {
      this.alertService.error('Votre identifiant ou votre mot de passe sont incorrectes');
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(){
    this.authService.signOut();
  }

}
