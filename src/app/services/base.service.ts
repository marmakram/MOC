import { HttpErrorResponse, HttpHeaders, HttpParams, HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    constructor(protected router: Router, protected http: HttpClient, protected toastr: ToastrService) {
    }

    protected handleError(error: HttpErrorResponse) {
        debugger;
        if (error.status == 401) {
            this.router.navigate(['/users/login']);
        }
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        //window.alert(errorMessage);//TODO
        return throwError(errorMessage);
    }

    getHeaderContentTye(): HttpHeaders {
        return new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Authorization', "Bearer " + this.getToken())
    }

    getHttpParams(): HttpParams {
        return new HttpParams()
            .set('content-type', 'application/json')
            .set('Authorization', this.getToken())
    }

    getToken(): string {
        let token = localStorage.getItem('tokenKey');
        /* if(!token){
          this.router.navigate(['/users/login']);
          return null;
        } */
        return token;
    }

    Get<T>(url: string, params: HttpParams = null) {
        return this.http.get<any>(url, { params, headers: this.getHeaderContentTye() })
        .pipe(catchError(this.handleError.bind(this)))
        .pipe(map<any, T>(a => {
            return a.data;
         }));
      }

      Post<T>(url: string, model: any) {
        return this.http.post<any>(url, model, { headers: this.getHeaderContentTye() })
        .pipe(catchError(this.handleError.bind(this)))
        .pipe(map<any, T>(a => {
            if(a.data)
                return a.data;
            else
                return a;
        }));
      }
}