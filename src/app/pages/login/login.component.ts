import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private logControl: LoginService;
  private route: ActivatedRoute;
  private router: Router;

  public failed = false;

  loginfo = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(logControl: LoginService, route: ActivatedRoute, router: Router) {
    this.logControl = logControl;
    this.route = route;
    this.router = router;
  }

  ngOnInit(): void {
  }

  async login() {
    const result = await this.logControl.login(this.loginfo.value);

    if (result) {
      this.router.navigate(['']);
    }
    this.failed = !result;
  }
}
