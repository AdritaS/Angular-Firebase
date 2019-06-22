import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private db: AngularFirestore) { }

  createEmployee(value) {
    var newPostKey = firebase.database().ref().child('employees').push().key;
    return this.db.collection('employees').add({
      empId: newPostKey,
      email: value.email,
      fullName: value.fullName,
    });
  }

  getAllEmployees(): Observable<any[]> {
    return this.db.collection('employees').valueChanges();
  }

}
