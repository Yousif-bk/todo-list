import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppRoutes } from '../../models/AppRoutes';
import { AuthReq } from '../../models/AuthReq';
import { LocallyStoredItemsKeys } from '../../models/LocallyStoredItemsKeys';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(this.isTokenAvailable());
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
  ) { }

  // Sign in with email/password
  async signIn(authReq: AuthReq) {
      await this.afAuth
      .signInWithEmailAndPassword(authReq.email, authReq.password);
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          localStorage.setItem(LocallyStoredItemsKeys.TOKEN, user.refreshToken);
          this.router.navigate([AppRoutes.Todo.main]);
        }
      });
  }


  // Sign up with email/password
  async signUp(authReq: AuthReq) {
       await this.afAuth
        .createUserWithEmailAndPassword(authReq.email, authReq.password).then((result) =>{
          result.user?.updateProfile({
            displayName:authReq.fullName
          })
        })
    }


  // Sign out
  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }

  private isTokenAvailable(): boolean {
    return !!localStorage.getItem(LocallyStoredItemsKeys.TOKEN);
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn);
  }

  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }
}
