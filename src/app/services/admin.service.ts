import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageHolder} from '../utils/page-holder';
import {Validators} from '@angular/forms';

const url = 'http://localhost:8080/api/admin';

export class AdminBooth {
  public id: number;
  public username: string;
  public isEnable: boolean;
  public isLock: boolean;
  public created: Date;
  public updated: Date;
}

export class AdminDefiner {
  public username = ['', Validators.required];
  public password = [''];
  public isEnable = [true];
  public isLock = [false];
}

export class AdminRecorder {
  public id = [0, Validators.min(1)];
  public username = ['', Validators.required];
  public password = [''];
  public isEnable = [true];
  public isLock = [false];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public async getList(): Promise<PageHolder<AdminBooth>> {
    return this.http.get<PageHolder<AdminBooth>>(url).toPromise();
  }

  public async create(definer: AdminDefiner) {
    return this.http.put(url, definer).toPromise();
  }

  public async update(recorder: AdminRecorder) {
    return this.http.post(url, recorder).toPromise();
  }

  public async delete(id: number) {
    return this.http.delete(url + '/' + id).toPromise();
  }
}
