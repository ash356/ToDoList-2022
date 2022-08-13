import { Component, OnInit } from '@angular/core';
import { NavBarService } from './services/nav-bar.service';
import { timer } from 'rxjs';
import { MethodsService } from './services/methods.service';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { UsersServicesService } from './services/users-services.service';
const counter = timer(0, 1000);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    counter.subscribe(() => {
      this.startTime();
    });
  }
  title = 'Todo-2022';
  days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  day: string = '';
  h: number = 0;
  m: number = 0;
  s: number = 0;
  user$ = this.auth.currentUser$;
  userdetails$ = this.userService.currentUserProfile$;
  constructor(
    public nav: NavBarService,
    public c: MethodsService,
    private auth: AuthenticationService,
    private userService: UsersServicesService,
    private router: Router
  ) {
    this.nav.hide();
    this.c.hide();
  }
  startTime() {
    // Day
    const d = new Date();
    this.day = this.days[d.getDay()];
    // Live Time
    const today = new Date();
    this.h = today.getHours();
    this.m = today.getMinutes();
    this.s = today.getSeconds();
    this.h = this.checkTime(this.h);
    this.m = this.checkTime(this.m);
    this.s = this.checkTime(this.s);
  }
  checkTime(i: any) {
    if (i < 10) {
      i = '0' + i;
    } // add zero in front of numbers < 10
    return i;
  }
  onClick() {
    this.c.toggle();
  }
  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/signin']);
    });
  }
}
