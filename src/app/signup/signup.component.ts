import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { NavBarService } from '../services/nav-bar.service';
import { UsersServicesService } from '../services/users-services.service';
import { MethodsService } from '../services/methods.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    public nav: NavBarService,
    private auth: AuthenticationService,
    private router: Router,
    private userService: UsersServicesService,
    private toast: HotToastService,
    public c: MethodsService,
  ) {
    this.nav.hide();
    this.c.hide();
  }
  onClick(){
    this.c.toggle();
  }
  onSubmit(value: any) {
    this.auth
      .signUp(
        value.email,
        value.password
        // value.firstname,
        // value.lastname,
      )
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.userService.addUser({
            userId: uid,
            email: value.email,
            password: value.password,
            firstName: value.firstname,
            lastName: value.lastname,
            displayName: value.firstname + ' ' + value.lastname,
          })
        ),
        this.toast.observe({
          success: 'Signed Up Successfully',
          // loading: 'Logging In...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
