import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RoleModel, Permission } from "../models/permission.model";
import { HttpParams, HttpClient } from "@angular/common/http";
import { setting } from "src/assets/setting";
import { map } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class RoleService extends BaseService {
    getAllRoles(): Observable<RoleModel[]> {
        return this.http.get<any>(this.baseUrl, { headers: this.getHeaderContentTye() }).pipe(map(a => a.data));
    }

    getRoleById(id: any): Observable<RoleModel> {
        return this.http.get<any>(this.baseUrl + '/' + id, { headers: this.getHeaderContentTye() }).pipe(map(a => a.data))
    }

    saveRole(model: RoleModel) {
        return this.http.post(this.baseUrl, model, { headers: this.getHeaderContentTye() });
    }

    assignRole(model: any) {
        return this.http.post(this.baseUrl + '/assign?', model, { headers: this.getHeaderContentTye() });
    }

    deleteRole(RoleId: any) {
        return this.http.delete(this.baseUrl + '/'+ RoleId, { headers: this.getHeaderContentTye() });
    }

    constructor(http: HttpClient, router: Router, toastr: ToastrService) {
        super(router, http, toastr);
    }

    getAllPermissions(): Observable<Permission[]> {
        return this.http.get<any>(setting.UrlApi + "api/permissions", { headers: this.getHeaderContentTye() })
        .pipe(map(a => a.data));
    }

    baseUrl: string = setting.UrlApi + "api/Roles";
}