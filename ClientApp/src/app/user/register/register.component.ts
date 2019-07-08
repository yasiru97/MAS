import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public Service: UserService, private toster:ToastrService, private router:Router) { }

  ngOnInit() {
    this.Service.formModel.reset();
  }

  onSubmit(){
    this.Service.register().subscribe(
      (res: any) => {
        if(res.succeeded) {
          this.Service.formModel.reset();
          this.toster.success('New User Created.','Registration Successfull!')
          this.router.navigate(['user/login']);
        } else{
          res.errors.forEach(element =>{
            switch(element.code){
              case 'DuplicateUserName':
                this.toster.error('UserName is already taken.','Registration Failed')
                //UserName is already taken
                break;

                default:
                this.toster.error(element.description,'Registration Failed')
                //Registration failed
                break;
            }
          });
        }
      },
      err =>{
        console.log(err);
      }
    );
  }
}
function newFunction() {
  return this;
}

