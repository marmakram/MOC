import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  userExist: boolean //= this.authService.getUserId() && this.authService.getUserId().length > 0;
  isSuperAdmin: boolean //= this.authService.isSuperAdmin();
  username: string //= this.authService.getUserName();

  constructor(private router: Router, private authService: AuthService) {
    this.authService.loginChanged.subscribe(a => {
      this.init()
    });
    this.init();
  }

  isPrivate: boolean = false;

  ngOnInit() {
    this.router.events.subscribe(x => {
    let a : any = x;
      if (a && a.url && a.url.indexOf('/users') > -1) {
        //debugger;
        this.isPrivate = true;
      }
    }); /* */
  }

  isExpanded = false;
  private init() {
     debugger;
    this.username = this.authService.getUserName();
    this.isSuperAdmin = this.authService.isSuperAdmin();
    let u = this.authService.getUserId();
    if (u && u.length > 0) {
      this.userExist = true;
    }
    else {
      this.userExist = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/home"]);
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
