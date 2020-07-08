import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { UserModel } from "../models/User.model";
import { Observable } from "rxjs";
import { setting } from "src/assets/setting";
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { BaseService } from "src/app/services/base.service";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {
  update(url: string, model: any, params: HttpParams) {
    return this.http.post(url, model, { params });
  }
  /* Get<T>(url: string, params: HttpParams = null) {
    return this.http.get<T>(url, { params, headers: this.getHeaderContentTye() }).pipe(catchError(this.handleError.bind(this)));
  } */
  markConfirmMail(id: any) {
    const params = new HttpParams()
      .append("userId", id);
    return this.update(this.baseUrl + 'markConfirmMail', null, params);
  }
  getAllUsers(): Observable<UserModel[]> {
    return this.Get<UserModel[]>(this.baseUrl);
  }
  getUserById(id: any): Observable<UserModel> {
    /* const params = new HttpParams()
      .append("id", id); */
    return this.Get<any>(this.baseUrl + id, null);
  }
  updateUser(model: UserModel) {
    return this.http.patch<any>(this.baseUrl, model, { headers: this.getHeaderContentTye() });
    //Post(this.baseUrl + 'Update', model);
  }
  confirmMail(id: any): Observable<any> {
    const params = new HttpParams()
      .append("userId", id);
    return this.http.post(this.baseUrl + 'confirmMail', null, { params: params });
  }
  saveUser(model: UserModel): any {
    return this.Post(this.baseUrl + 'Add', model);
  }
  deleteUser(userId: any) {
    return this.http.delete(this.baseUrl + userId, { headers: this.getHeaderContentTye() });
  }
  
  constructor(http: HttpClient, router: Router, toastr: ToastrService) {
    super(router, http, toastr);
  }
  baseUrl: string = setting.UrlApi + "api/users/";
}
