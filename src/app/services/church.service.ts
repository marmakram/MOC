import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ChurchModel } from "../models/church.model";
import {setting} from "../../assets/setting";
import { BaseService } from "./base.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../user/services/auth.service";
import { ChurchInfo } from "../models/chuch.info.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChurchService extends BaseService {

  getChurchInfo(churchId): Observable<ChurchInfo> {
    debugger;
    if(churchId == null) {
      this.router.navigate(["/home"]);
      return;
    }
    return this.Get<ChurchInfo>(this.baseUrl + churchId);
  }

  getChurchList(): Observable<ChurchModel[]> {   
    return this.http.get<ChurchModel[]>(this.baseUrl, { headers: this.getHeaderContentTye() })
    .pipe(map<any, ChurchModel[]>(a => {
      debugger
      return a.data? a.data : a;
   }));
    //this.Get<ChurchModel[]>(this.baseUrl);
  }

  update(model: ChurchModel) {
    return this.http.patch(this.baseUrl, model, { headers: this.getHeaderContentTye() });
  }

  constructor(http: HttpClient, router: Router, toastr: ToastrService, private authService: AuthService) {
    super(router, http, toastr);
}

  baseUrl: string = setting.UrlApi + "api/churches/";
}