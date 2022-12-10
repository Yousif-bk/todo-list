import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoRoutingModule } from './todo-routing.module';



@NgModule({
  declarations: [
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule
  ]
})
export class TodoListModule { }
