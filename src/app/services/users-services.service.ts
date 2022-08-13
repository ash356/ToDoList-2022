import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  collection,
  docData,
  collectionData,
  addDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { updateDoc } from '@firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { Users } from '../models/users';
import { Location } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root',
})
export class UsersServicesService {
  constructor(
    private fire: Firestore,
    private auth: AuthenticationService,
    private loc: Location,
    private toast: HotToastService
  ) {}
  //  Get Current
  get currentUserProfile$(): Observable<Users | null> {
    return this.auth.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.fire, 'users', user?.uid);
        return docData(ref) as Observable<Users>;
      })
    );
  }
  //  Add New User
  addUser(user: Users): Observable<any> {
    const ref = doc(this.fire, 'users', user?.userId as string);
    return from(setDoc(ref, user));
  }
  //  Update User
  updateUser(user: Users): Observable<void> {
    const ref = doc(this.fire, 'users', user?.userId as string);
    return from(updateDoc(ref, { ...user }));
  }
  //  Add Note Method
  addNote(user: Users) {
    let dbInstance = collection(this.fire, 'notes');
    return from (addDoc(dbInstance, user))
    .pipe(
      this.toast.observe({
        success: 'Successfully',
        // loading: 'Logging In...',
        error: ({ message}) => `${message}`
      })
    )
    .subscribe(() => {
      this.loc.back();
    });
  }
  getInTouch(user: Users) {
    let dbInstance = collection(this.fire, 'messages');
    return from (addDoc(dbInstance, user))
    .pipe(
      this.toast.observe({
        success: 'Successfully',
        // loading: 'Logging In...',
        error: ({ message}) => `${message}`
      })
    )
    .subscribe(() => {
      this.loc.back();
    });
  }
}
