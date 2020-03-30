import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {PageHolder} from '../../utils/page-holder';

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.css']
})
export class TableContentComponent implements OnInit {
  page: PageHolder<any> = new PageHolder<any>();

  @Input('content-title') contentTitle = 'Table Content';
  @Input('table-title') tableTitle = 'Table Data';
  @ContentChild(TemplateRef) dataItem: TemplateRef<any>;

  @Output('on-create') create = new EventEmitter();
  @Output('on-update') update = new EventEmitter();
  @Input('on-init') refresh: () => PageHolder<any>;
  @Input('on-delete') delete: (id: number) => void;

  isAdd: boolean;
  isUpdate: boolean;

  constructor() {
  }

  async ngOnInit() {
    console.log(this.page);
  }

  showAdd() {
    this.isAdd = true;
  }

  showUpdate() {
    this.isUpdate = true;
  }

  hidden() {
    this.isAdd = false;
    this.isUpdate = false;
  }

  async createItem() {
    this.page = this.refresh();
    this.create.emit();
    this.hidden();
  }

  async updateItem() {
    this.page = this.refresh();
    this.update.emit();
    this.hidden();
  }
}
