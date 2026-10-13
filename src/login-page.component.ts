import { Component } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FormControl,FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from './app/auth/auth';
@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  imports: [ ReactiveFormsModule, RouterModule]
})
export class LoginPageComponent {

  public loginForm!: FormGroup
  constructor(private formbuilder: FormBuilder,private http: HttpClient, private router: Router,private authService:Auth) { }
  ngOnInit(): void {
      this.loginForm = this.formbuilder.group({
        username: [""],
        password: ["", Validators.required]
      })
    }
  login(){
    if(this.loginForm.valid){
      this.loginService(this.loginForm.value);
    }
  }
  loginService(data: any) {
        this.authService.getUsersByUsername(data.username).subscribe(filteredUsers => {
         if (filteredUsers && filteredUsers.length > 0) {
            localStorage.setItem('authUser', JSON.stringify(data));
            this.router.navigate(['/home']);
         }else{
            alert("no user found!");
         }
        });
    }

}
