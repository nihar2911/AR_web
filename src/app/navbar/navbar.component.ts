import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service'

import { NgForm } from '@angular/forms';
import { getElementDepthCount } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {


  constructor(private userService: UserService, private router : Router) { }
  model ={
    email :'',
    password:''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  ngOnInit() {
    if(this.userService.isLoggedIn())
      this.router.navigateByUrl('/userprofile');

  }


  onSubmit(form: NgForm) {
    console.log("SignUP", form.value);
    // var _login = document.getElementById('login');
    //     _login.setAttribute("data-dismiss", "modal");
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);  
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
          console.log("kuch hua?");
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
          console.log("kuch hua?");
      }
    );
  }

  resetForm(form: NgForm) {
    console.log("kuch hua?");
    this.userService.selectedUser = {
      name: '',
      email: '',
      phone: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  } 

  signIn(signInForm : NgForm){
    console.log("SignIn", signInForm.value);
    this.userService.login(signInForm.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
