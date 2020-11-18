import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router
  ) { }

  // signUpUser(email: string, password: string){
  //   return new Promise(
  //     (resolve, reject) => {
  //       firebase.auth().createUserWithEmailAndPassword(email, password).then(
  //         () => {
  //           console.log('Connecté');
  //           resolve();
  //         }
  //       ).catch(
  //         (error) => {
  //           reject(error);
  //         }
  //       );
  //     }
  //   )
  // }

  signInUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
            resolve(data);
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        );
      }
    )
  }

  signOutUser(){
    firebase.auth().signOut().then(
      () => {
        this.router.navigate(['']);
      }
    );
  }
}
