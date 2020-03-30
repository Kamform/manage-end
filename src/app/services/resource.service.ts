import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageHolder} from '../utils/page-holder';

const url = 'http://localhost:8080/api/resource';

export class Resource {
  public id: number;
  public title: string;
  public summary: string;
  public created: Date;
  public updated: Date;
  public category: number;
  public author: number;
}

export class ResourceDefiner {
  public title: [string] = [''];
  public summary: [string] = [''];
  public author: [number] = [0];
  public category: [number] = [0];
  public files: [number[]] = [[]];
}

export class ResourceRecorder {
  public id: [number] = [0];
  public title: [string] = [''];
  public summary: [string] = [''];
  public category: [number] = [0];
  public files: [number[]] = [[]];
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async getList() {
    return this.http.get<PageHolder<Resource>>(url).toPromise();
  }

  async create(definer: ResourceDefiner) {
    return this.http.put(url, definer).toPromise();
  }

  async update(recorder: ResourceRecorder) {
    return this.http.post(url, recorder).toPromise();
  }

  async delete(id: number) {
    return this.http.delete(url + '/' + id);
  }
}
