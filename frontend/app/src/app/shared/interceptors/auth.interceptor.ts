import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor( ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authToken = localStorage.getItem('Token');
        const headers = new HttpHeaders()
        .append('Authorization', `Bearer ${authToken}`);
        const modifiedReq = authToken? req.clone({ headers }):req;
        return next.handle(modifiedReq);

    }
}
