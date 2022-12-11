import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppRoutes } from '../../models/AppRoutes';
import { Todo } from '../../models/Task';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  setTask = new BehaviorSubject<Todo[]>([]);
  constructor(
    private angularFirestoreModule: AngularFirestore,
    private router:Router) { }

  // Get all Task
  getTasksList() {
    return this.angularFirestoreModule
      .collection('Task-collection')
      .snapshotChanges();
  }

  getTask(taskId: any) {
    console.log("taskId",taskId)
    return this.angularFirestoreModule
      .collection('Task-collection')
      .doc(taskId)
      .valueChanges();
  }
  // Create Task
  createTask(todo: Todo) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestoreModule.collection('Task-collection')
        .add(todo).then(() =>{
          this.router.navigate([AppRoutes.Todo.main])
        })
    })
  }

  // update
  updateTask(todo: Todo, id: any) {
    return this.angularFirestoreModule
      .collection('Task-collection')
      .doc(id)
      .update({
        title: todo.title,
        note: todo.note,
        priority: todo.priority
      })
  }

  // Delete
  deleteTask(todo: Todo) {
    return this.angularFirestoreModule
      .collection('Task-collection')
      .doc(todo.id)
      .delete()
  }

  setSelectedTask(todo: Todo[]): void {
    this.setTask.next(todo);
  }

  getSelectedTask() {
    return this.setTask;
  }
}
