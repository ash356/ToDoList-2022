import { Component, OnInit } from '@angular/core';
import { Tasks } from '../models/tasks';
import { Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { DataBaseService } from '../services/data-base.service';
import { NavBarService } from '../services/nav-bar.service';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UsersServicesService } from '../services/users-services.service';
import { Users } from '../models/users';
const counter = timer(0, 1);
@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.css'],
})
export class ImportantComponent implements OnInit {
  ngOnInit(): void {
    counter.subscribe(() => {
      this.filter();
    });
  }
  id: any;
  uId: any;
  udetail: Users = {};
  data: Tasks[] = [];
  tasks: Tasks[] = [];

  importanttasks: Tasks[] = [];
  constructor(
    public nav: NavBarService,
    private db: DataBaseService,
    private fire: Firestore,
    private ar: ActivatedRoute,
    private userService: UsersServicesService
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
  filter() {
    for (let i in this.tasks) {
      const q = query(
        collection(this.fire, 'tasks'),
        where('listName', '==', 'Important'),
        where('userId', '==', this.uId)
      );
      getDocs(q).then((response) => {
        console.log(
          response.docs.map((item) => {
            return { ...item.data(), id: item.id };
          })
        );
        this.importanttasks = [
          ...response.docs.map((item) => {
            return { ...item.data(), id: item.id };
          }),
        ];
      });
    }
  }
  delete(taskid: any) {
    this.db
      .deleteTask(taskid)
      .then(() => {})
      .catch(() => {});
  }
}
