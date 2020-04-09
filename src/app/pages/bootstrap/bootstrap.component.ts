import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css']
})
export class BootstrapComponent implements OnInit {

  constructor(
    public auth: AuthenticationService
  ) {
  }

  ngOnInit(): void {
  }

}
