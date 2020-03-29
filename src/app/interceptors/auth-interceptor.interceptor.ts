import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthServiceService } from "../services/auth-service.service";

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const loggedInUser = this.authService.auth;
    if (loggedInUser) {
      request = request.clone({
        headers: request.headers.set(
          "Authorization",
          `Bearer ${loggedInUser.jwt}`
        )
      });
      console.log(
        `=== SENDING REQUEST (${request.urlWithParams}) WITH JWT TOKEN (${loggedInUser.jwt}) ===`
      );
    } else {
      console.log(`=== SENDING REQUEST (${request.urlWithParams}) ===`);
    }
    console.log(request);

    return next.handle(request).pipe(
      tap(
        response => {
          if (response instanceof HttpResponse) {
            console.log("==== RESPONSE OK ====", response);
          }
        },
        error => {
          console.log("==== RESPONSE ERROR ====", error);
          if (error.error.errors) {
            console.error("The server sent the error: ", error.error.errors);
          }
        }
      )
    );
  }
}
