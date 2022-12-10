import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/shared/models/AppRoutes';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

const routes: Routes = [
  {
    path: "",
    children: [
       {
          path: AppRoutes.Todo.sub,
          component: TodoListComponent,
       },
       {
        path: AppRoutes.Todo.new.main,
        component: TodoFormComponent,
     },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TodoRoutingModule { }
