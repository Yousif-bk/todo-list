import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  uiState = {
    isSubmitting:false,
    isLoading:false
  }
 /* Forms */
 todoListFormGroup: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  createTask(){}
}
