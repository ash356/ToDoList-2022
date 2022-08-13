import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentReference,
  Firestore,
  getDocs,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tasks } from '../models/tasks';

@Injectable({
  providedIn: 'root',
})
export class DataBaseService {
  afs: any;
  ref: any;
  tasks: Tasks[] = [];
  task: Tasks[] = [];
  r:any = collection(this.fire,"tasks");
  constructor(
    private fire: Firestore,
    private router: Router,
    private loc: Location
  ) {}
  //  Add Task Method
  addTask(task: Tasks) {
    let dbInstance = collection(this.fire, 'tasks');
    addDoc(dbInstance, task)
      .then((data: DocumentReference) => {
        console.log(data.id);
        // alert('Data Sent Successfully');
        // this.router.navigate(['/home']);
        this.loc.back(); // Back One Step
        // this.getData();
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  // Get Tasks Method
  getTasks() {
    let dbInstance = collection(this.fire, 'tasks');
    return collectionData(dbInstance, { idField: 'tId' }) as Observable<
      Tasks[]
    >;
  }
  // Delete Task
  deleteTask(id: string) {
    let ref = doc(this.fire, 'tasks/' + id);
    return deleteDoc(ref);
  }
  // Get Task
  getTask(id: string) {
    let ref = doc(this.fire, "tasks/" + id);
    return docData(ref, { idField: "tId" }) as Observable<Tasks[]>;
  }
  //  Update Task
  updateTask(id:string,task:Tasks) {
    let ref = doc(this.fire, 'tasks/' + id);
    return setDoc(ref ,task);
  }
  // filter() {
  //   for (let i in this.tasks) {

  //     const q = query(this.r,where('listName', '==', 'Today'));
  //     getDocs(q).then((response:any) => {
  //       console.log(
  //         response.docs.map((item) => {
  //           return { ...item.data(), id: item.id };
  //         })
  //       );
  //       this.fruitProducts = [
  //         ...response.docs.map((item) => {
  //           return { ...item.data(), id: item.id };
  //         }),
  //       ];
  //     });
  //   }
  // }

  // filter(){
  //   this.afs.collection('tasks', this.ref , this.ref.where('listName', '==', 'Today'));
  //   this.tasks=this.afs;
  //   // const d = collection(this.fire, 'tasks');
  //   // const q = query(d:string ,where('type', '==', 'Fruit'))
  // }
  // filter(){
  //   for (let t in this.tasks) {
  //     // if (this.products[i].status == 'Not Valid') {
  //     const q = query(collection(this.fire, 'tasks'),where('type', '==', 'Fruit')
  //     );
  //     getDocs(q).then((response) => {
  //       console.log(
  //         response.docs.map((item) => {
  //           return { ...item.data(), id: item.id };
  //         })
  //       );
  //       this.fruitProducts = [
  //         ...response.docs.map((item) => {
  //           return { ...item.data(), id: item.id };
  //         }),
  //       ];
  //     });
  //   }
  // }
}
