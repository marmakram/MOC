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
export class OdasService extends BaseService {

    constructor(http: HttpClient, router: Router, toastr: ToastrService, private authService: AuthService) {
        super(router, http, toastr);
    }

    create(model: any) {
        return this.Post(this.baseUrl, model);
    }
    getAll():Observable<any> {
        return this.Get(this.baseUrl);
    }
    baseUrl: string = setting.UrlApi + "api/services";
}