import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Agence Immo';
  isLoggedIn = false;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (userSession) => {
          if(userSession){
            this.isLoggedIn = true;
          }else{
            this.isLoggedIn = false;
          }
      }
    );
  }

  logoutUser(){
    this.authenticationService.signOutUser();
  }

}
