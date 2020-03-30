import {Component, OnInit} from '@angular/core';
import {File, FileDefiner, FileRecorder, FileService} from '../../services/file.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PageHolder} from '../../utils/page-holder';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  private service: FileService;

  definer: FormGroup;
  recorder: FormGroup;
  page: PageHolder<File>;

  constructor(service: FileService, builder: FormBuilder) {
    this.service = service;

    this.definer = builder.group(new FileDefiner());
    this.recorder = builder.group(new FileRecorder());
    this.page = new PageHolder<File>();
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.service.getList().then(value => {
      this.page = value;
    });
  }

}
