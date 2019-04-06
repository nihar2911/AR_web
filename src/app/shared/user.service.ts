import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { User } from './user.model';
import { Subject, Observable } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component'



@Injectable({
  providedIn: 'root'
})



export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };
  private subject = new Subject<any>();


  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }


  login(authCredentials: any) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    console.log('token', token);
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  loggedIN() {
    var token = this.getToken();
    if (token == null)
      return false;
    else
      return true;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  getUserName(user: string) {
   this.subject.next({text: user});
   
   console.log("loggedIn", this.subject.asObservable());
  }

  sendUserName():Observable<any> {
   return this.subject.asObservable();
  }
} 