import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../services/authentication.service';
import { NavBarService } from '../services/nav-bar.service';
import { MethodsService } from '../services/methods.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(
    public nav: NavBarService,
    private auth: AuthenticationService,
    private router: Router,
    private toast: HotToastService,
    public c: MethodsService,
  ) {
    this.nav.hide();
    this.c.hide();
  }
  onLogIn(value: any) {
    this.auth
      .login(value.email, value.password)
      .pipe(
        this.toast.observe({
          success: 'Logged In Successfully',
          // loading: 'Logging In...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
  onClick(){
    this.c.toggle();
  }
}
