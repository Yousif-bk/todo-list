import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { ContentLayoutComponent } from './shared/components/content-layout/content-layout.component';
import { AppRoutes } from './shared/models/AppRoutes';
import { content } from './shared/routes/content-routes';

const routes: Routes = [
  {
    path: AppRoutes.Auth.signIn.full,
    component: SignInComponent,
    pathMatch: 'full',
    // canActivate: [UnauthGuard]
  },
  {
    path: '',
    redirectTo: AppRoutes.Todo.full,
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
