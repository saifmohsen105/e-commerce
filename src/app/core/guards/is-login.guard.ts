import { CanActivateFn, Router } from '@angular/router';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const token = localStorage.getItem('userToken');
  return token ? true : router.navigate(['/sign-in']);
};
