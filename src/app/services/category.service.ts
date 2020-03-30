import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageHolder} from '../utils/page-holder';

const url = 'http://localhost:8080/api/category';

export class Category {
  public id: number;
  public name: string;
  public sort: number;
}

export class CategoryDefiner {
  public name: [string] = [''];
  public sort: [number] = [0];
}

export class CategoryRecorder {
  public id: [number] = [0];
  public name: [string] = [''];
  public sort: [number] = [0];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async getList() {
    return this.http.get<PageHolder<Category>>(url).toPromise();
  }

  async create(definer: CategoryDefiner) {
    return this.http.put(url, definer).toPromise();
  }

  async update(recorder: CategoryRecorder) {
    return this.http.post(url, recorder).toPromise();
  }

  async delete(id: number) {
    return this.http.delete(url + '/' + id).toPromise();
  }
}
