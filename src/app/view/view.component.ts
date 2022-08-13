import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { NavBarService } from '../services/nav-bar.service';
import { UsersServicesService } from '../services/users-services.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  profileForm = new FormGroup({
    name: new FormControl(''),
    email:new FormControl(''),
    phone: new FormControl(''),
    message:new FormControl(''),
  });
  constructor(public nav:NavBarService,
    private userService: UsersServicesService,) {
    this.nav.hide();
   }
   onSubmit(value: any) {
    this.userService.getInTouch(value);
  }

}
