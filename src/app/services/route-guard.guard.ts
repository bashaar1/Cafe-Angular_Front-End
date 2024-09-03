import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import { jwtDecode } from 'jwt-decode';
import { GlobalConstants } from '../shared/global-constant';

@Injectable({
  providedIn: 'root'
})

export class RouteGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: SnackbarService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRoleArray = route.data["expectedRole"] as string[];
    const token: any = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    let tokenPayload: any;
    try {
      tokenPayload = jwtDecode(token);
    } catch (err) {
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }

    const userRole = tokenPayload.role;
    console.log(userRole);
    console.log(expectedRoleArray);
    const hasExpectedRole = expectedRoleArray.includes(userRole);

    if (this.auth.isAuthenticated() && hasExpectedRole) {
      return true;
    }

    this.snackBar.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
    this.router.navigate(['/cafe/dashboard']);
    return false;
  }
}
