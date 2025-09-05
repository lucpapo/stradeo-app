// src/app/corepcode/http/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../security/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenSvc = inject(TokenService);
  const token = tokenSvc.getToken?.();
  if (token) req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  return next(req);
};
