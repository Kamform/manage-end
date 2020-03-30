import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageHolder} from '../utils/page-holder';

const url = 'http://localhost:8080/api/file';

export class File {
  public id: number;
  public name: string;
  public created: Date;
  public updated: Date;
  public author: number;
}

export class FileDefiner {

}

export class FileRecorder {

}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async getList() {
    return this.http.get<PageHolder<File>>(url).toPromise();
  }

  async create(definer: FileDefiner) {
    return this.http.put(url, definer).toPromise();
  }

  async update(recorer: FileRecorder) {
    return this.http.post(url, recorer).toPromise();
  }

  async delete(id: number) {
    return this.http.delete(url + '/' + id);
  }
}
