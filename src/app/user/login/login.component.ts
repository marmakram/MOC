import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private _service: AuthService, private toastr: ToastrService) { }//private fb: FormBuilder

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.currForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  currForm: FormGroup;

  submit() {
    if (this.currForm.valid) {
      this._service.login(this.currForm.get('username').value, this.currForm.get('password').value).subscribe(a => {
        if (a.data && a.data.id) {
          if (this._service.isValid()) {
            this.toastr.success("logged Successfully .. Redirecting");
            debugger;
            if (this._service.isSuperAdmin()) {
              this.router.navigate(["/users/user-list"]);
            }
            else { 
              this.router.navigate(["/church-seats"]);
            }
          }
        }
      });
    }
  }
}
