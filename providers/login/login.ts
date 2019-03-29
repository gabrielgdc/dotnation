import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { auth } from 'firebase/app';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient, private afAuth: AngularFireAuth) {
  }
  
  createUser(credentials){
    console.log(credentials);
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.senha);
  }

  signOut(){
    return this.afAuth.auth.signOut();
  }

  signIn(credentials){
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.senha);
  }

  resetPassword(data){
    return this.afAuth.auth.sendPasswordResetEmail(data.email);
  }

  getCurrentUser(){
    return this.afAuth.auth.currentUser;
  }

}
