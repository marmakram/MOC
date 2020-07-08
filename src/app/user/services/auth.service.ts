import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { setting } from "src/assets/setting";
import { tap } from 'rxjs/operators';
import { TokenModel } from "../models/token.model";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    logout() {
        localStorage.clear();
        this.loginChanged.emit(false);
    }
    isValid(): boolean {
        let val = localStorage.getItem('tokenKey');
        if (val && val.length > 0) {
            return true;
        }
        return false;
    }
    isSuperAdmin(): boolean {
        let val = localStorage.getItem('isSuperAdmin');
        if (val&& val != "undefined" && val.length > 0) {
            return true;
        }
        return false;
    }

    getUserId(): string {
        let val = localStorage.getItem('UserId');
        return val;
    }
    getUserName(): string {
        let val = localStorage.getItem('UserName');
        return val;
    }

    getHeaderContentTye() {
        return {
            headers: new HttpHeaders().set('content-type', 'application/json')
        }
    }
    constructor(private http: HttpClient, private toastr: ToastrService) {
    }
    @Output() loginChanged = new EventEmitter();
    
    login(username: string, password: string) {
        let model : any = { email: username };
        if(password) {
            model.password = password
        }

        return this.http.post<any>(this.baseUrl + 'login', model, this.getHeaderContentTye())
            .pipe(
                tap(a => {
                    if (!a.meta) {
                        this.toastr.error(a.message);
                        return false;
                    }
                    let token = a.meta.token;
                    console.log("Tokenn");
                    console.log(token);
                    localStorage.setItem('tokenKey', JSON.stringify(token).slice(1, -1));//
                    localStorage.setItem('isSuperAdmin', a.data.permissions.find(a => a.name == "Insert" && a.model == "user"));
                    if(a.data.arabicName) localStorage.setItem('UserName', a.data.arabicName);
                    else localStorage.setItem('UserName', a.data.email);
                    debugger;
                    localStorage.setItem('UserId', a.data.id);
                    localStorage.setItem('SignedIn', 'logged in');
                    this.loginChanged.emit(true);

                })
            );
        //localStorage.setItem('tokenKey', null);
    }

    baseUrl: string = setting.UrlApi + "api/users/";
}