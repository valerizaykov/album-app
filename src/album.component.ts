import { Component,inject,OnInit } from '@angular/core';
import { Auth } from './app/auth/auth';
import { Router } from '@angular/router';
import { AlbumService } from './app/album-service';
import {Observable } from 'rxjs';
import {forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  imports: [AsyncPipe,FormsModule],
   styles: `
         input[type=text] {
                    width: 50%;
                    padding: 12px;
                    margin: 10px 0;
                    box-sizing: border-box;

          }
          button {
            background-color: #04AA6D;
              border: none;
              color: white;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              cursor: pointer;
              border: 2px solid #555555;
           }
           button:hover {
             background-color: #4CAF50; /* Green */
             color: white;
           }
           table {
             font-family: Arial, Helvetica, sans-serif;
             border-collapse: collapse;
             width: 100%;
           }

           td, th {
             border: 1px solid #ddd;
             padding: 8px;
           }

           tr:nth-child(even){background-color: #f2f2f2;}

           tr:hover {background-color: #ddd;}

           th {
             padding-top: 12px;
             padding-bottom: 12px;
             text-align: left;
             background-color: #04AA6D;
             color: white;
           }

         `,
})
export class AlbumComponent implements OnInit{
   finalPost!: Observable<any[]>;
   query ='';
   constructor(
   public authService: Auth,
   private router: Router,
   private album_srv: AlbumService){}
   ngOnInit(): void {
     this.filterPosts();
   }
   //filtering method in search
   filterPosts() {
       this.finalPost = this.getJoinedData().pipe(
             map(posts => {
               if (!this.query.trim()) {
                 return posts;
               }
               return posts.filter(post =>
                 post.title.toLowerCase().includes(this.query.toLowerCase())
               );
             })
           );
   }
   //add new post I'm using a test api so its not actually adding anything
   add(){
	     this.router.navigate(['/add-post']);
   }
   getJoinedData(): Observable<any[]> {
    return forkJoin([
       this.album_srv.usersShowAll(),
       this.album_srv.postsShowAll()
    ]).pipe(
      map(([users, posts]) => {
        return posts
          .map(post => {
            const matchingUser = users.find(user => user.id === post.userId);
            return matchingUser ? { ...post, user: matchingUser } : null;
          })
          .filter(post => post !== null);
      })
    );
  }

  logout(){
      this.authService.logout();
      this.router.navigate(['/login']);
  }
  openNewOrderForm(){
          this.router.navigate(['/add-post']);
  }
}
