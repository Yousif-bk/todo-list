import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ContentLayoutComponent } from './shared/components/content-layout/content-layout.component';
import { AuthGuard } from './shared/helper/guards/auth.guard';
import { UnauthGuard } from './shared/helper/guards/unauth.guard';
import { AppRoutes } from './shared/models/AppRoutes';
import { content } from './shared/routes/content-routes';

const routes: Routes = [
  {
    path: AppRoutes.Auth.signIn.full,
    component: SignInComponent,
    pathMatch: 'full',
    canActivate: [UnauthGuard]
  },
  {
    path: AppRoutes.Auth.signUp.full,
    component: SignUpComponent,
    pathMatch: 'full',
    canActivate: [UnauthGuard]
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
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: AppRoutes.Todo.full,
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
