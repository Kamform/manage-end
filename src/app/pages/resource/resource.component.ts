import {Component, OnInit} from '@angular/core';
import {Resource, ResourceDefiner, ResourceRecorder, ResourceService} from '../../services/resource.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PageHolder} from '../../utils/page-holder';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  private service: ResourceService;

  definer: FormGroup;
  recorder: FormGroup;
  page: PageHolder<Resource>;

  constructor(service: ResourceService, builder: FormBuilder) {
    this.service = service;
    this.definer = builder.group(new ResourceDefiner());
    this.recorder = builder.group(new ResourceRecorder());
    this.page = new PageHolder<Resource>();
  }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.page = await this.service.getList();
  }

}
