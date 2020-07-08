import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { HomeUserComponent } from './home-user/home-user.component';
//import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MaterialModule,
  ],
  declarations: [
    AddUserComponent,
    UsersListComponent,
    LoginComponent,
    HomeUserComponent
  ]
})
export class UserModule { }
