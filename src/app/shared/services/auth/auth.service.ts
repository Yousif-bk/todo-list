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

  /**
   * Sign in with email/password
   * @param authReq
   */
  async signIn(authReq: AuthReq) {
    await this.afAuth
      .signInWithEmailAndPassword(authReq.email, authReq.password);
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem(LocallyStoredItemsKeys.TOKEN, user.refreshToken);
        // Set authenticated user flag
        this.setIsLoggedIn(true);
        this.router.navigate([AppRoutes.Todo.main]);

      }
    });
  }


  /**
   *
   * @param authReq Sign up with email/password/full name
   */
  async signUp(authReq: AuthReq) {
    await this.afAuth
      .createUserWithEmailAndPassword(authReq.email, authReq.password).then((result) => {
        result.user?.updateProfile({
          displayName: authReq.fullName
        })
        this.router.navigate([AppRoutes.Todo.main]);
      })
  }


  // Sign out
  async signOut(): Promise<any> {
    // Clear JWT from localstorage
    localStorage.clear();
    // Update logged in status
    this.setIsLoggedIn(false);
    // Navigate user back to signIn page
    await this.router.navigate([AppRoutes.Auth.signIn.full]);
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
