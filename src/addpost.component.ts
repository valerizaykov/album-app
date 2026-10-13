import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlbumService } from './app/album-service';
import { FormControl,FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-post',
  templateUrl: './addpost.html',
  imports: [ ReactiveFormsModule, RouterModule],
  styles: `
        input[type=text] {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          box-sizing: border-box;
        }
        input[type=submit] {
                  width: 100%;
                  background-color: #04AA6D;
                  color: white;
                  padding: 14px;
                  margin: 8px 0;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                }
      `,
})
export class AddPostComponent {
  postForm!: FormGroup;
  insData:any;
  constructor(private formbuilder: FormBuilder ,private router: Router,private albumSrv: AlbumService){}
  ngOnInit(): void {
      let user = JSON.parse(localStorage.getItem('authUser') || '{}');
      this.postForm = this.formbuilder.group({
                      title: ["",Validators.required],
                      body: ["", Validators.required],
                      username:[user.username],

      })
  }
  public onSubmit(){
	   let user = JSON.parse(localStorage.getItem('authUser') || '{}');
	   this.insData = {
                       'title': this.postForm.get('title')?.value,
                       'body': this.postForm.get('body')?.value,
                        'username':{'id':user.id}
                     };
	   if (this.postForm.valid) {
	                     this.albumSrv.createPost(this.insData).subscribe({
                          next: (data: any) => {
                          console.log(data);
                          this.router.navigate(['/home']);

						           },
                        error: (err) => console.log(err)
                      });

	   }
  }
}
