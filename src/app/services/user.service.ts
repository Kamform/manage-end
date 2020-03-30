import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageHolder} from '../utils/page-holder';

export class UserBooth {
  public id: number;
  public username: string;
  public isAdmin: boolean;
  public isEnable: boolean;
  public isLock: boolean;
  public created: Date;
  public updated: Date;
  public email: string;
  public phone: string;
}

export class UserDefiner {
  public username: string;
  public password: string;
  public email: string;
  public phone: string;

  public isAdmin = false;
  public isEnable = true;
  public isLock = false;
}

export class UserRecorder {
  public id: number;

  public username: string;
  public password: string;
  public email: string;
  public phone: string;

  public isAdmin = false;
  public isEnable = true;
  public isLock = false;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/api/user';
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public async getUserList(): Promise<PageHolder<UserBooth>> {
    return this.http.get<PageHolder<UserBooth>>(this.url).toPromise();
  }

  public async createUser(definer: UserDefiner) {
    return this.http.put(this.url, definer).toPromise();
  }

  public async updateUser(recorder: UserRecorder) {
    return this.http.post(this.url, recorder).toPromise();
  }

  public async deleteUser(id: number) {
    return this.http.delete(this.url + '/' + id).toPromise();
  }
}
