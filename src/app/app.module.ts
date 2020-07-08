import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { AuthSuperGuardService } from './services/AuthSuperGuard.service';
import { ChurchSeatsComponent } from './church-seats/church-seats.component';
import { UserModule } from './user/user.module';
import { routes } from './user/user-routing.module';
import { SelectSeatComponent } from './select-seat/select-seat.component';
import { BotDetectCaptchaModule } from 'angular-captcha';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ChurchSeatsComponent,
    SelectSeatComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CommonModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    UserModule,
    BotDetectCaptchaModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: "/home",
        pathMatch: 'full'
      },
      { path: 'home', component: HomeComponent },
      { path: 'church-seats', component: ChurchSeatsComponent },
      { path: 'select-seat', component: SelectSeatComponent },
      {
        path: 'users',
        children: routes
        //'./user/user.module#UserModule'//() => import('./user/user.module').then(m => m.UserModule)
      }
      /* {
        path: 'users',
        loadChildren: './user/user.module#UserModule'//() => import('./user/user.module').then(m => m.UserModule)
      } */
    ])
  ],

  providers: [AuthSuperGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
