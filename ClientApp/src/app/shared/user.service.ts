import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }
  readonly BaseURI = 'http://localhost:56085/api'

  formModel = this.fb.group({
    UserName : ['',Validators.required],
    Email :    ['',Validators.email],

   Passwords : this.fb.group({
      Password :['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword :['',Validators.required]
    }, {Validator:this.comparePasswords})

  });

  comparePasswords(fb:FormGroup){
    let ConfirmPasswordCtrl = fb.get('ConfirmPassword');
      if(ConfirmPasswordCtrl.errors == null || 'passwordMismatch' in ConfirmPasswordCtrl.errors){
        if(fb.get('Password').value != ConfirmPasswordCtrl.value)
        ConfirmPasswordCtrl.setErrors({ passwordMismatch: true });
        else
        ConfirmPasswordCtrl.setErrors(null);
      }      
  }

  register(){
    var body = {
      UserName:this.formModel.value.UserName,
      Email:this.formModel.value.Email,
      Password:this.formModel.value.Passwords.Password
    };
   return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData){
   return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);

  }

  getUserProfile(){
       return this.http.get(this.BaseURI + '/UserProfile');
  }

  logout(){
    return localStorage.removeItem('token');
  }
}
