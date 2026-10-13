import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import {map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  httpClient = inject(HttpClient);
  baseUrl = 'https://jsonplaceholder.typicode.com';
  headerDict = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' ,
      //'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      //'Sec-WebSocket-Key': 'dGhlIHNhbXBsZSBub25jZQ=='
    }



  requestOptions = {
      'headers': this.headerDict,
  };
  constructor() { }

  getUsersByUsername(username: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/users`, this.requestOptions)
      .pipe(
        map(data => data.filter(object => object.username === username))
      );
  }

  logout() {
        localStorage.removeItem('authUser');
  }
  isLoggedIn() {
        //console.log("Inside-GET");
        return localStorage.getItem('authUser') !== null;
  }
 }
