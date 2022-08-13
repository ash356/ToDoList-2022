import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../services/nav-bar.service';
import { Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { timer } from 'rxjs';
import { DataBaseService } from '../services/data-base.service';
import { Tasks } from '../models/tasks';
import { Users } from '../models/users';
import { UsersServicesService } from '../services/users-services.service';
import { ActivatedRoute } from '@angular/router';
const counter = timer(0, 1);
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
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
  taskstasks: Tasks[] = [];
  constructor(
    public nav: NavBarService,
    private db: DataBaseService,
    private userService: UsersServicesService,
    private ar: ActivatedRoute,
    private fire: Firestore
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
        where('listName', '==', 'Tasks'),
        where('userId', '==', this.uId)
      );
      getDocs(q).then((response) => {
        console.log(
          response.docs.map((item) => {
            return { ...item.data(), id: item.id };
          })
        );
        this.taskstasks = [
          ...response.docs.map((item) => {
            return { ...item.data(), id: item.id };
          }),
        ];
      });
    }
  }
}
