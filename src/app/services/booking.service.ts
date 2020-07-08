import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { setting } from "../../assets/setting";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthService } from "../user/services/auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookingService extends BaseService {

    constructor(http: HttpClient, router: Router, toastr: ToastrService) {
        super(router, http, toastr);
    }

    create(model: any): Observable<any> {
        return this.Post(this.baseUrl, model);
    }

    baseUrl: string = setting.UrlApi + "api/booking";
}