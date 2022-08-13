import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  user,
  UserInfo,
} from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);
  constructor(private auth: Auth) {}
  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }
  signUp(
    // firstname:string,
    // lastname:string,
    username: string,
    password: string
  ){
    return from(
      createUserWithEmailAndPassword(this.auth, username, password)
    )
    // .pipe(
    //   switchMap(({ user }) =>
    //     updateProfile(user,
    //        {
    //         // displayName:firstname+" "+lastname
    //         })
    //   )
    // );
  }
  logout() {
    return from(this.auth.signOut());
  }
  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not authenticated');

        return updateProfile(user, profileData);
      })
    );
  }
}
