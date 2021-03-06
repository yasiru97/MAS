import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userDetails;

  constructor(private router:Router,private service:UserService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res =>{
        this.userDetails = res;
      },
      err=>{
        console.log(err);
      },
    );
  }

  onLogout($event) {
    $event.preventDefault();
    this.service.logout();
    this.router.navigate(['user/login']);
  }
}
