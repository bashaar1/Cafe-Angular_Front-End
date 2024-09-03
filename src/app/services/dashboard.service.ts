import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  token: string = localStorage.getItem('token') || "";
  getDetails() {
    return this.httpClient.get(this.url + '/dashboard/details', /*{
      headers: new HttpHeaders().set('Authorization', 'bearer ' + this.token)
    }*/);
  }
}