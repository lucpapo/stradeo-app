// src/app/corepcode/security/token.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  getToken(): string | null { return localStorage.getItem('access_token'); }
  setToken(value: string) { localStorage.setItem('access_token', value); }
  clear() { localStorage.removeItem('access_token'); }
}
