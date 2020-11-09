import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service'
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username:any
  password:any
  constructor(private loginSer:LoginService,private routee:Router) { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  ngOnInit() {
  }
  getData(){
    this.loginSer.login(this.username,this.password)
    .subscribe(
      res=>
      {
        // console.log(res+"res")
        console.log(res)
        localStorage.setItem("token",res["token"])
        localStorage.setItem("roles",res["roles"])
        localStorage.setItem("pharmacyLoggedInID",res["pharmacyLoggedInID"])
        console.log(localStorage.getItem("token"))
        this.routee.navigate(['/home/showdrug'])
      }
      // ,error =>
      // {
      //   // console.log(error)
      // }
    )
    // console.log(localStorage.getItem("token"))
    console.log(localStorage.getItem("roles"))
    console.log(localStorage.getItem("pharmacyLoggedInID"))
    console.log(localStorage)
    // localStorage.clear();
  }
}
