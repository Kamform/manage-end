import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http: HttpClient;

  islog = false;

  private username: string;
  private password: string;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async login(logger) {
    this.username = logger.username;
    this.password = logger.password;
    try {
      await this.http.get(
        'http://localhost:8080/api/login',
        {
          headers: {
            Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
          }
        }).toPromise();
    } catch (e) {
      this.islog = false;
    }
    this.islog = true;
    return this.islog;
  }

  logout() {
    this.islog = false;
  }
}
