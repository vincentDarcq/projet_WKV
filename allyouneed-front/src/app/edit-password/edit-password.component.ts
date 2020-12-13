import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { AlertService } from '../services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  users: Array<User>;
  user: User;
  editPass: boolean;
  passForm: FormGroup;
  question: boolean;
  reponse: string;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private alertService: AlertService,
              private router: Router) {
    this.user = new User();
    this.editPass = false;
    this.question = false;
   }

  ngOnInit() {
    this.users = this.loginService.getUsers();
    this.passForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
    });
  }

  checkResponse(){
    if(this.reponse === this.user.reponse){
      this.editPass = true;
    }
    if(!this.editPass){
      this.alertService.error("La réponse donnée est incorrecte");
    }
  }

  checkUser(){
    for(let user of this.users){
      if(user.pseudonyme === this.user.pseudonyme){
        this.user= user;
        this.question = true;
      }
    }
    if(typeof this.user.question === 'undefined'){
      this.alertService.error("Ce pseudonyme est inconnu");
    }
  }

  get f() {
    return this.passForm.controls;
  } 

  savePass(){
    this.submitted = true; 
    if(this.passForm.controls.password.errors){
      return;
    }
    this.user.password = this.passForm.value.password;
    this.loginService.editUser(this.user);
    this.router.navigate(['']);
  }

}
