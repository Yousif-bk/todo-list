import { Routes } from "@angular/router";
import { AppRoutes } from "../models/AppRoutes";

export const content: Routes = [
  {
     path: AppRoutes.Todo.main,
     loadChildren: () => import("../../../app/components/todo/todo-list.module").then((m) => m.TodoListModule),
  },
];
