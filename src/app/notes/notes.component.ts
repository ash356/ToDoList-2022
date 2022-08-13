import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { NavBarService } from '../services/nav-bar.service';
import { UsersServicesService } from '../services/users-services.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  userdetails$ = this.userService.currentUserProfile$;
  user$ = this.auth.currentUser$;
  profileForm = new FormGroup({
    userId: new FormControl('1'),
    // firstName:new FormControl(''),
    // lastName:new FormControl(''),
    notes: new FormControl(''),
  });
  constructor(
    private nav: NavBarService,
    private userService: UsersServicesService,
    private toast: HotToastService,
    private auth: AuthenticationService
  ) {
    this.nav.show();
  }
  ngOnInit(): void {
    this.userService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        // this.profileForm.patchValue({...user});
      });
  }
  onSubmit(value: any) {
    this.userService.addNote(value);
  }
}
