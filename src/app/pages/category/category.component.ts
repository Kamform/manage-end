import {Component, OnInit, ViewChild} from '@angular/core';
import {Category, CategoryDefiner, CategoryRecorder, CategoryService} from '../../services/category.service';
import {PageHolder} from '../../utils/page-holder';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CardComponent} from '../../components/card/card.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  private service: CategoryService;

  @ViewChild('addCard')
  private addCard: CardComponent;
  @ViewChild('updateCard')
  private updateCard: CardComponent;

  definer: FormGroup;
  recorder: FormGroup;
  page: PageHolder<Category>;

  constructor(service: CategoryService, builder: FormBuilder) {
    this.service = service;

    this.definer = builder.group(new CategoryDefiner());
    this.recorder = builder.group(new CategoryRecorder());
    this.page = new PageHolder<Category>();
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.service.getList().then(value => {
      this.page = value;
    });
  }

  create() {
    this.addCard.hidden();
    this.service.create(this.definer.value).then(_ => {
      this.refresh();
    });
  }

  update() {
    this.updateCard.hidden();
    this.service.update(this.recorder.value).then(_ => {
      this.refresh();
    });
  }

  delete(id: number) {
    this.service.delete(id).then(_ => {
      this.refresh();
    });
  }
}
