import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // isAuth() devuelve un Observable<boolean>
  // tap() -> si no esta autenticado direccionar a /login
  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap(state => !state ? this.router.navigate(['/login']) : null
      ));
  }

}
