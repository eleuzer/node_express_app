import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';

@Injectable()
export class HttpBasicAuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        if(url.includes("/token")) {
            const { id, secret } = body;
            const hash = window.btoa(id + ':' + secret);

            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${hash}`
                }
            });

        } else if (!url.includes("/users")) {
            const { username, password } = body;
            const hash = window.btoa(username + ':' + password);

            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${hash}`
                }
            });
        }

        return next.handle(request);
    }
}