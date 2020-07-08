import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChurchService } from '../services/church.service';
import { ChurchModel } from '../models/church.model';
import { CaptchaComponent } from 'angular-captcha';
import { setting } from 'src/assets/setting';
import { BaseService } from '../services/base.service';
import { AuthService } from '../user/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  nationalId: string;
  displayChurches: boolean;
  churchList: ChurchModel[] =[];

  @ViewChild(CaptchaComponent, { static: true }) captchaComponent: CaptchaComponent;
  constructor(private router: Router, private _BaseService :BaseService
    , private _service: AuthService, private toastr: ToastrService) {
  }
  ngOnInit() {
    if (this.captchaComponent != null)
      this.captchaComponent.captchaEndpoint = `${setting.BotUrlApi}simple-captcha-endpoint.ashx`;

  }
  getChurches() {
    //if (this.nationalId != null && this.nationalId.length > 0) 
    {
      //TODO authenticate nationalId
      if (this.captchaComponent != null) {
        // get the user-entered captcha code value to be validated at the backend side        
        let userEnteredCaptchaCode = this.captchaComponent.userEnteredCaptchaCode;

        // get the id of a captcha instance that the user tried to solve
        let captchaId = this.captchaComponent.captchaId;
      }
      this._service.login(this.nationalId, null).subscribe(a => {
        if (a.data && a.data.id) {
          if (this._service.isValid()) {
            this.toastr.success("logged Successfully .. Redirecting");
              this.router.navigate(["/select-seat"]);
            
          }
        }
        else {
          this.toastr.error("هذا الرقم غير صحيح. من فضلك حاول مرة أخرى");
        }
      }, err => {
        debugger
        this.toastr.error("حدث خطأ.. من فضلك حاول مرة أخرى");
        console.log(err)
      });
      /* // get church list
      this.churshService.getChurchList().subscribe(a => {
        this.churchList = a;
        this.displayChurches = true;
      }); */
    }
  }

  selectChurch(churchId: any) {
    this.router.navigate(["/select-seat"]);//, this.nationalId
  }
}
