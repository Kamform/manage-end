import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {PageHolder} from '../../utils/page-holder';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public recorder: FormGroup;
  public definer: FormGroup;

  public page: PageHolder<any>;

  constructor(
    public auth: AuthenticationService,
    private builder: FormBuilder
  ) {
    this.page = new PageHolder<any>();

    this.definer = builder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      isEnable: new FormControl(true),
      isLock: new FormControl(false),
    });

    this.recorder = builder.group({
      id: new FormControl(0),
      nickname: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      isEnable: new FormControl(true),
      isLock: new FormControl(false),
    });

    this.refresh();
  }

  async ngOnInit() {
  }

  refresh() {
    this.auth.takeToken().get<PageHolder<any>>(
      '/api/admin'
    ).then(value => {
      this.page = value;
    });
  }

  displayData(item) {
    this.recorder.setValue({
      id: item.id,
      nickname: item.nickname,
      password: '',
      isEnable: item.isEnable,
      isLock: item.isLock
    });
  }

  create() {
    if (this.definer.valid) {
      this.auth.takeToken().put(
        '/api/admin',
        this.definer.value
      ).then(_ => {
        this.refresh();
      });
    }
  }

  update() {
    if (this.recorder.valid) {
      this.auth.takeToken().post(
        '/api/admin',
        this.recorder.value
      ).then(_ => {
        this.refresh();
      });
    }
  }

  deleteAdmin(id: number) {
    this.auth.takeToken().delete(
      '/api/admin', id
    ).then(_ => {
      this.refresh();
    });
  }
}
