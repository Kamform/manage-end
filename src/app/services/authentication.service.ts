import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = 'http://localhost:8080';
  private token = '';
  private useAuth = false;
  private account: any;

  public error;
  public isLogin: boolean;

  constructor(
    private http: HttpClient,
  ) {
    this.isLogin = this.isAuthenticated();
  }

  async getAccount() {
    if (this.account != null) {
      return this.account;
    }

    return this.account = await this.takeToken().get<any>(
      '/api/master'
    );
  }

  takeToken() {
    this.useAuth = true;
    return this;
  }

  isAuthenticated() {
    return this.getToken() !== '';
  }

  getToken(): string {
    return this.token !== '' ? this.token : (this.token = document.cookie);
  }

  private options(params?) {
    let headers = {};
    if (this.useAuth) {
      headers = {Authorization: 'Bearer ' + this.getToken()};
      this.useAuth = false;
    }
    return {
      params,
      headers
    };
  }

  logout() {
    this.token = '';
    document.cookie = '';
    this.isLogin = false;
  }

  async authenticate(loginInfo: {
    username: string, password: string
  }): Promise<boolean> {
    return this.http.post<{
      token: string,
      info: any
    }>(
      this.url + '/api/authenticate',
      {
        username: loginInfo.username,
        password: loginInfo.password
      }
    ).toPromise().catch(reason => {
      this.error = reason;
      return {
        token: '',
        info: null
      };
    }).then(value => {
      console.log(value);
      this.token = document.cookie = value.token;
      this.account = value.info;
      return this.isLogin = this.isAuthenticated();
    });
  }

  async refreshToken(token: string) {
    return this.http.post<{
      token: string,
      info: any
    }>(
      '/api/refresh-token',
      {
        string: token
      }
    ).toPromise().catch(reason => {
      this.error = reason;
      return {
        token: '',
        info: null
      };
    }).then(value => {
      console.log(value);
      this.token = document.cookie = value.token;
      this.account = value.info;
      return this.isLogin = this.isAuthenticated();
    });
  }

  async get<T>(
    path: string,
    params?: HttpParams | {
      [param: string]: string | string[];
    }): Promise<T> {

    return this.http.get<T>(
      this.url + path,
      this.options(params)).toPromise()
      .catch(() => {
        this.refreshToken(this.token);
        return this.http.get<T>(
          this.url + path,
          this.options(params)
        ).toPromise();
      });
  }

  async post(path: string, body: any) {
    return this.http.post(
      this.url + path,
      body,
      this.options()
    ).toPromise().catch(() => {
      this.refreshToken(this.token);
      return this.http.post(
        this.url + path,
        body,
        this.options()
      ).toPromise();
    });
  }

  async put(path: string, body: any) {
    return this.http.put(
      this.url + path,
      body,
      this.options()
    ).toPromise().catch(() => {
      this.refreshToken(this.token);
      return this.http.put(
        this.url + path,
        body,
        this.options()
      ).toPromise();
    })
      .then(() => {
        return true;
      }).catch(() => {
        return false;
      });
  }

  async patch(path: string, body: any) {
    return this.http.patch(
      this.url + path,
      body,
      this.options()
    ).toPromise().catch(() => {
      this.refreshToken(this.token);
      return this.http.patch(
        this.url + path,
        body,
        this.options()
      ).toPromise();
    });
  }

  async delete(url: string, id: number) {
    return this.http.delete(
      `${this.url}${url}/${id}`, this.options()
    ).toPromise().catch(() => {
      this.refreshToken(this.token);
      return this.http.delete(
        `${this.url}${url}/${id}`, this.options()
      ).toPromise();
    });
  }
}
