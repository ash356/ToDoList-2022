import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../services/data-base.service';
import { NavBarService } from '../services/nav-bar.service';
import { UsersServicesService } from '../services/users-services.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  userdetails$ = this.userService.currentUserProfile$;
  constructor(
    public nav: NavBarService,
    private userService: UsersServicesService,
    private db: DataBaseService
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
    this.db.addTask(value);
  }
}
