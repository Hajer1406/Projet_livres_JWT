import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toExclude = '/login';

  // tester s'il s'agit de login, on n'ajoute pas le header Authorization
  // puisqu'on n'a pas encore de JWT (il est null)
  if (req.url.search(toExclude) === -1) {
    let jwt = authService.getToken();
    let reqWithToken = req.clone({
      setHeaders: { Authorization: 'Bearer ' + jwt },
    });
    return next(reqWithToken);
  }
  return next(req);
};

