import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {map, Observable, tap } from 'rxjs';
    export interface User {
      id: number;
      name: string;
    }

    export interface Post {
      id: number;
      userId: number;
      title: string;
      body : string;
    }
@Injectable({
  providedIn: 'root'
})

export class AlbumService {
    baseUrl = 'https://jsonplaceholder.typicode.com';
    headerDict = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
    requestOptions = {
      'headers': this.headerDict,
    };
    constructor(private httpClient: HttpClient) { }
    postsShowAll() {
        return  this.httpClient.get<Post[]>(`${this.baseUrl}/posts`,this.requestOptions);
    }
    usersShowAll() {
        return  this.httpClient.get<User[]>(`${this.baseUrl}/users`,this.requestOptions);
    }
    getUsersbyId(id:number){
        return  this.httpClient.get(`${this.baseUrl}/users/`+id);
    }
	createPost(post:Post[]){
		   return  this.httpClient.post<Post[]>(`${this.baseUrl}/posts`,post,this.requestOptions);
	}
}
