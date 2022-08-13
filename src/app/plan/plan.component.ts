import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../services/nav-bar.service';
import { collection } from '@firebase/firestore';
import { Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { timer } from 'rxjs';
import { Tasks } from '../models/tasks';
import { DataBaseService } from '../services/data-base.service';
import { Users } from '../models/users';
import { ActivatedRoute } from '@angular/router';
import { UsersServicesService } from '../services/users-services.service';
const counter = timer(0, 1);
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent implements OnInit {
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
  plantasks: Tasks[] = [];
  constructor(
    public nav: NavBarService,
    private fire: Firestore,
    private db: DataBaseService,
    private userService: UsersServicesService,
    private ar: ActivatedRoute
  ) {
    this.id = this.ar.snapshot.params['id'];
    this.userService.currentUserProfile$.subscribe((data) => {
      this.udetail = data as object;
      this.uId = this.udetail.userId;
    });
    this.nav.show();
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
        where('listName', '==', 'Plan'),
        where('userId', '==', this.uId)
      );
      getDocs(q).then((response) => {
        console.log(
          response.docs.map((item) => {
            return { ...item.data(), id: item.id };
          })
        );
        this.plantasks = [
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
