import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../login-page.component';
import { AlbumComponent } from '../album.component';
import { AddPostComponent } from '../addpost.component';
import { authGuard } from './auth/auth-guard';

const routes: Routes = [
   {path:"", redirectTo:"login", pathMatch:"full"},
   {path:"login", component:LoginPageComponent},
   {path:"logout", component:LoginPageComponent},
   {path:"home", component:AlbumComponent,canActivate: [authGuard]},
   {path:"add-post", component:AddPostComponent},
   ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
