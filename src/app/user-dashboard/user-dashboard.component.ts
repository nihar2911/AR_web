import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers: [UserService]
})
export class UserDashboardComponent implements OnInit {
  userDetails;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.userService.getUserName(this.userDetails.name);
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
