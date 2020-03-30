import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css']
})
export class BootstrapComponent implements OnInit {
  logService: LoginService;

  constructor(loginService: LoginService) {
    this.logService = loginService;
  }

  ngOnInit(): void {
  }

}
