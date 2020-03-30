import {Component, OnInit, ViewChild} from '@angular/core';
import {PageHolder} from '../../utils/page-holder';
import {AdminBooth, AdminDefiner, AdminRecorder, AdminService} from '../../services/admin.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CardComponent} from '../../components/card/card.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private service: AdminService;
  private builder: FormBuilder;

  public page: PageHolder<AdminBooth> = new PageHolder<AdminBooth>();
  public recorder: FormGroup;
  public definer: FormGroup;

  @ViewChild('add') addCard;
  @ViewChild('update') updateCard;

  constructor(service: AdminService, builder: FormBuilder) {
    this.service = service;
    this.builder = builder;
  }

  async ngOnInit() {
    this.listAdmin();
    this.recorder = this.builder.group(new AdminRecorder());
    this.definer = this.builder.group(new AdminDefiner());
  }

  listAdmin() {
    this.service.getList().then(value => {
      this.page = value;
    });
  }

  createAdmin() {
    this.service.create(this.definer.value).then(_ => {
      this.listAdmin();
    });
    this.addCard.hidden();
  }

  updateAdmin() {
    this.service.update(this.recorder.value).then(_ => {
      this.listAdmin();
    });
    this.updateCard.hidden();
  }

  deleteAdmin(id: number) {
    this.service.delete(id).then(_ => {
      this.listAdmin();
    });
  }

  displayData(item) {
    this.recorder.setValue({
      id: item.id,
      username: item.username,
      password: '',
      isEnable: item.isEnable,
      isLock: item.isLock
    });
  }
}
