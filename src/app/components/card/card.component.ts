import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  private showValue: boolean;

  @Output()
  private showChange = new EventEmitter();

  @Input()
  public get show() {
    return this.showValue;
  }

  public set show(value: boolean) {
    this.showValue = value;
    this.showChange.emit(this.showValue);
  }

  constructor() {
    this.showChange.subscribe();
  }

  hidden() {
    this.show = false;
  }
}
