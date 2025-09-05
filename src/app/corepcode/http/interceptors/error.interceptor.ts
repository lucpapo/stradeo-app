// src/app/corepcode/http/interceptors/error.interceptor.ts
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export interface AppError {
  status: number;
  code?: string;
  message: string;
  details?: any;
}

function mapToAppError(err: HttpErrorResponse): AppError {
  const msg = (err.error?.mensagem ?? err.error?.message ?? err.statusText ?? 'Erro inesperado');
  return { status: err.status, message: typeof msg === 'string' ? msg : 'Falha na requisição', details: err.error };
}

export const errorInterceptor: HttpInterceptorFn = (_req, next) =>
  next(_req).pipe(
    catchError((err: HttpErrorResponse) => {
      const appErr = mapToAppError(err);
      // aqui você pode integrar com toaster, log etc.
      return throwError(() => appErr);
    })
  );
