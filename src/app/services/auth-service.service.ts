import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { buildCompleteUrl } from "../shared/utils";

export interface AuthModel {
  jwt: string;
  username: string;
  email?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthServiceService {
  get auth() {
    return JSON.parse(localStorage.getItem("auth"));
  }

  set auth(authModel: AuthModel) {
    const stringified = JSON.stringify(authModel);
    localStorage.setItem("auth", stringified);
  }

  registerUser(user: { username: string; password: string; email?: string }) {
    this.http.post(buildCompleteUrl("register"), user).subscribe(response => {
      if (response instanceof HttpResponse) {
        this.auth = {
          username: response.body.username,
          jwt: response.body.jwt,
          email: response.body.email
        };
      }
    });
  }

  loginUser(user: { username: string; password: string }) {
    this.http
      .post(buildCompleteUrl("login"), user)
      .subscribe((response: any) => {
        const data = response.data;
        this.auth = {
          username: data.username,
          jwt: data.jwt,
          email: data.email
        };
      });
  }

  constructor(private http: HttpClient) {}
}
