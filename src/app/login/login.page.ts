import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { Credentials } from '../models/login.interface';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginErrorMessage: string;
  loginFailed: boolean;
  loginForm: FormGroup;
  isSubmited: boolean;
  constructor(private authService:AuthService, private router: Router) { 
     //build the form
     this.loginForm = new FormGroup({
        userName: new FormControl("",{
          validators: [
          Validators.required,
          Validators.minLength(2)
        ]}),
        password:  new FormControl("",{
          validators: [
          Validators.required,
          Validators.minLength(2)
        ]})
     })

  }

  ngOnInit() {
  }

  /** get the username formcontrol of the form */
  get userName() { 
        return this.loginForm.get('userName');
    }

    /** get the password formcontrol of the form */
  get password(){
    return this.loginForm.get('password');
  }

  /**
   * this method is called when you click on submit
   */
  onSubmit(){
    this.loginFailed = false;
    //check if the form is valid
    if(this.loginForm.valid) {
      
         let cred : Credentials = this.loginForm.value;

         this.authService.login(cred.userName,cred.password).subscribe(x => {
          //if logged in go to the home
          this.router.navigateByUrl('/home');
       },(error) => {
         //when failed set the login failed true and fill in the message
         this.loginFailed = true;
         this.loginErrorMessage = error.error;
       });
    }
    else {
      //if not valid we need to show errors
      this.isSubmited = true;
    }

   
  }

}
