import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap, switchMap, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '../services/authentication.service';
import { ImageUploadService } from '../services/image-upload.service';
import { NavBarService } from '../services/nav-bar.service';
import { UsersServicesService } from '../services/users-services.service';
import { Users } from '../models/users';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public event?: Event;

  us: Users = {};
  profileForm = new FormGroup({
    userId: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });
  user$ = this.auth.currentUser$;
  userdetails$ = this.userService.currentUserProfile$;
  constructor(
    public nav: NavBarService,
    private auth: AuthenticationService,
    private image: ImageUploadService,
    private toast: HotToastService,
    private userService: UsersServicesService,
    private loc: Location
  ) {
    this.nav.show();
  }
  ngOnInit(): void {
    this.userService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }
  saveProfile() {
    const profileData = this.profileForm.value;
    this.userService
      .updateUser(profileData)
      .pipe(
        this.toast.observe({
          loading: 'Saving profile data...',
          success: 'Profile updated successfully',
          error: 'There was an error in updating the profile',
        })
      )
      .subscribe();
  }
  url: any = '';
  uploadImage(event: any, user: User) {
    this.image
      .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: ({ message }) => `${message}`,
        }),
        concatMap((photoURL) =>
          this.auth.updateProfileData({
            photoURL,
          })
        )
      )
      .subscribe();
  }
  onCancel() {
    this.loc.back();
  }
}
