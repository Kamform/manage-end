import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../services/login.service';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  private logControl: LoginService;
  private router: Router;

  constructor(login: LoginService, router: Router) {
    this.logControl = login;
    this.router = router;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.logControl.islog) {
      this.router.navigate(
        ['login'],
        {
          queryParams: {
            mapping: state.url
          }
        });
      return false;
    }
    return true;
  }
}
