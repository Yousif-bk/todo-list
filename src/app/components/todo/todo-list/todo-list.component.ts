import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/models/AppRoutes';
import { Todo } from 'src/app/shared/models/Task';
import { AppService } from 'src/app/shared/services/app/app.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
// Ui State
uiState = {
  isLoading:false,
  selectedStatus: '',
}
  todo: Todo[]
  displayedColumns: string[] = ['title', 'note', 'priority','action'];
  constructor(private appService: AppService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTasksList();
  }

  setStatus(status: string){
    console.log(status);

    this.uiState.selectedStatus = status
  }


  getTasksList() {
    this.uiState.isLoading = true
    this.appService.getTasksList().pipe().subscribe(res => {
      this.todo = res.map(e => {
        this.uiState.isLoading = false
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Todo;
      })
    })
  }

  // Remove
  removeTask(todo: Todo) {
    if (confirm('Are You' + todo.title)) {
      this.appService.deleteTask(todo)
    }
  }
}
