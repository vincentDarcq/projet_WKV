import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  login: User;
  
  
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService) {
    this.login = new User();
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      pseudonyme: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
      email: ['', Validators.required, Validators.email],
      question: ['', Validators.required],
      reponse: ['', Validators.required],
    });    
  }

  get f() {
    return this.loginForm.controls;
  } 

  createAccount(){
    this.submitted = true; 
    if(this.loginForm.controls.password.errors){
      return;
    }
    this.login = new User(this.loginForm.value.pseudonyme, this.loginForm.value.email, 
      this.loginForm.value.password, this.loginForm.value.question, this.loginForm.value.reponse);
      this.loginService.register(this.login); 
  }

  displayPassword(){
    if($("#checkbox").prop("checked")){
      $("#password").attr("type", "text");
    }else {
      $("#password").attr("type", "password");
    }
  }
  
}
