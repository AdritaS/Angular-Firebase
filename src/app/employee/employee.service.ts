import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { IEmployee } from './IEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private db: AngularFirestore) { }

  createEmployee(employee: IEmployee) {
    return this.db.collection('employees').add(employee);
  }

  getAllEmployees(): Observable<any[]> {
    return this.db.collection('employees').snapshotChanges();
  }

  getEmployeeById(id) {
    return this.db.doc('employees/' + id).get();
  }


  deleteEmployee(id) {
    return this.db.collection("employees").doc(id).delete();
  }

}
