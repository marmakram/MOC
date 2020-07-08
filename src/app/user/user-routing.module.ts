import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthSuperGuardService } from '../services/AuthSuperGuard.service';

export const routes: Routes = [
  { path: 'add-user/:id', canActivate: [AuthSuperGuardService], component: AddUserComponent },
  { path: 'add-user/:id/view', canActivate: [AuthSuperGuardService], component: AddUserComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'user-list', canActivate: [AuthSuperGuardService], component: UsersListComponent },
  /* { path: 'add-role/:id', component: AddRoleComponent },
  { path: 'add-role', component: AddRoleComponent },
  { path: 'role-list', component: RolesListComponent }, */
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
