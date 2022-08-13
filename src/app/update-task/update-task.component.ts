import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tasks } from '../models/tasks';
import { DataBaseService } from '../services/data-base.service';
import { NavBarService } from '../services/nav-bar.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent {
  taskId: any;
  task: Tasks = {};
  constructor(
    public nav: NavBarService,
    private db: DataBaseService,
    private ar: ActivatedRoute,
    private loc: Location
  ) {
    this.taskId = this.ar.snapshot.params['id'];
    this.db.getTask(this.taskId).subscribe((data) => {
      this.task = data as object;
    });
    this.nav.show();
  }
  onSubmit(value: any) {}
  update() {
    this.db
      .updateTask(this.taskId, this.task)
      .then(() => {
        this.loc.back();
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  cancel() {
    this.loc.back();
  }
  delete(taskid: any) {
    this.db
      .deleteTask(taskid)
      .then(() => {
        // this.loc.back();
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}
