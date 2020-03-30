import {Component, OnInit} from '@angular/core';
import {UserBooth, UserDefiner, UserRecorder, UserService} from '../../services/user.service';
import {PageHolder} from '../../utils/page-holder';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private service: UserService;

  public page: PageHolder<UserBooth>;
  public users: UserBooth[];
  public definer = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    isAdmin: new FormControl(false),
    isEnable: new FormControl(true),
    isLock: new FormControl(false),
  });
  public recorder = new FormGroup({
    id: new FormControl(-1),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    isAdmin: new FormControl(false),
    isEnable: new FormControl(true),
    isLock: new FormControl(false),
  });

  constructor(service: UserService) {
    this.service = service;
    this.page = new PageHolder<UserBooth>();
  }

  async ngOnInit(): Promise<void> {
    this.refresh();
  }

  createUser() {
    const definer: UserDefiner = this.definer.getRawValue();
    this.cancel();
    this.service.createUser(definer).then(value => {
      this.refresh();
    });
  }

  updateUser() {
    const recorder: UserRecorder = this.recorder.getRawValue();
    this.cancel();
    this.service.updateUser(recorder).then(value => {
      this.refresh();
    });
  }

  deleteUser(id: number) {
    this.service.deleteUser(id).then(value => {
      this.refresh();
    });
  }

  refresh() {
    this.service.getUserList().then(value => {
      this.page = value;
      this.users = this.page.content;
    });
  }

  showAdd() {
    const bg: HTMLElement = document.querySelector('.bg');
    const add: HTMLElement = document.querySelector('.add');
    bg.classList.add('back');
    add.style.display = 'block';
  }

  showUpdate(user: UserBooth) {
    this.recorder.setValue({
      id: user.id,
      username: user.username,
      password: null,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isEnable: user.isEnable,
      isLock: user.isLock,
    });
    const bg: HTMLElement = document.querySelector('.bg');
    const update: HTMLElement = document.querySelector('.update');
    bg.classList.add('back');
    update.style.display = 'block';
  }

  cancel() {
    const bg: HTMLElement = document.querySelector('.bg');
    const add: HTMLElement = document.querySelector('.add');
    const update: HTMLElement = document.querySelector('.update');
    bg.classList.remove('back');
    add.style.display = 'none';
    update.style.display = 'none';
  }
}
