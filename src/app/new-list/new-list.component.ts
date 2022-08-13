import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../services/nav-bar.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css'],
})
export class NewListComponent {
  constructor(public nav: NavBarService) {
    this.nav.show();
  }
}
