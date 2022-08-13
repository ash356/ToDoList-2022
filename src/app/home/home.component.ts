import { Component, OnInit } from '@angular/core';
import { Tasks } from '../models/tasks';
import { DataBaseService } from '../services/data-base.service';
import { NavBarService } from '../services/nav-bar.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { timer } from 'rxjs';
import { UsersServicesService } from '../services/users-services.service';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../models/users';
const counter = timer(0, 1);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    counter.subscribe(() => {
      this.filter();
    });
    this.userService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        // this.profileForm.patchValue({...user});
      });
  }
  id: any;
  uId: any;
  udetail: Users = {};
  data: Tasks[] = [];
  tasks: Tasks[] = [];
  hometasks: Tasks[] = [];
  // userdetails$ = this.userService.currentUserProfile$;
  constructor(
    public nav: NavBarService,
    private db: DataBaseService,
    private fire: Firestore,
    private userService: UsersServicesService,
    private ar: ActivatedRoute
  ) {
    this.id = this.ar.snapshot.params['id'];
    this.userService.currentUserProfile$.subscribe((data) => {
      this.udetail = data as object;
      this.uId = this.udetail.userId;
    });
    this.nav.show();
    this.db.getTasks().subscribe((data) => {
      console.log(data);
      this.tasks = data;
    });
  }

  delete(taskid: any) {
    this.db
      .deleteTask(taskid)
      .then(() => {})
      .catch(() => {});
  }
  filter() {
    for (let i in this.tasks) {
      const q = query(
        collection(this.fire, 'tasks'),
        where('listName', '==', 'Today'),
        where('userId', '==', this.uId)
      );
      getDocs(q).then((response) => {
        console.log(
          response.docs.map((item) => {
            return { ...item.data(), id: item.id };
          })
        );
        this.hometasks = [
          ...response.docs.map((item) => {
            return { ...item.data(), id: item.id };
          }),
        ];
      });
    }
  }
}
