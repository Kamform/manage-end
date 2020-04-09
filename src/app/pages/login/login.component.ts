import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);

  public form: FormGroup;

  constructor(
    public auth: AuthenticationService,
    private router: Router,
    builder: FormBuilder,
  ) {
    this.form = builder.group({
      username: this.username,
      password: this.password
    });
  }

  ngOnInit(): void {
  }

  async login() {
    if (this.form.valid) {
      this.auth.authenticate(this.form.value).then(value => {
        this.router.navigate(['/']);
      }).catch(reason => {
        alert('login failed');
      });
    }
  }
}
