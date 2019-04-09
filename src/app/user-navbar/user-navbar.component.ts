import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
  providers: [UserService]
})
export class UserNavbarComponent implements OnInit {
  userDetails;
  userInitalized = false;

  constructor(private userService: UserService, private router: Router) {
    
   }

  ngOnInit() {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.userInitalized = true;
      },
      err => { 
        console.log(err);       
      }
    );
  
    
  }

  onLogout(){
    this.userService.deleteToken();
    // console.log('login',this.userService.loggedIn);
    this.router.navigate(['']);
  }

}
