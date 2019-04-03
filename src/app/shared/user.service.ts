import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { User } from './user.model';
import { logging } from 'protractor';

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

  loggedIn = false; 

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register', user);
  }

  
  login(authCredentials) {
 
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn = true;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.loggedIn = false;
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


  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

}
