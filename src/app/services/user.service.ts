import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  signup(data: any) {
    return this.httpClient.post(this.url + "/user/signup", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    });
  }

  signin(data: any) {
    return this.httpClient.post(this.url + '/user/login', data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }
  forgetPassword(data: any) {
    return this.httpClient.post(this.url + '/user/forgetPassword', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
  checkToken() {
    return this.httpClient.get(this.url + '/user/checkToken');
  }
}
