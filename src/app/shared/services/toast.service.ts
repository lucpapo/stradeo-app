import { Injectable } from '@angular/core';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: ToastMessage[] = [];
  private idCounter = 0;

  getToasts(): ToastMessage[] {
    return this.toasts;
  }

  success(title: string, message: string, duration: number = 5000): void {
    this.show('success', title, message, duration);
  }

  error(title: string, message: string, duration: number = 8000): void {
    this.show('error', title, message, duration);
  }

  warning(title: string, message: string, duration: number = 6000): void {
    this.show('warning', title, message, duration);
  }

  info(title: string, message: string, duration: number = 5000): void {
    this.show('info', title, message, duration);
  }

  private show(type: ToastMessage['type'], title: string, message: string, duration: number): void {
    const id = `toast-${++this.idCounter}`;
    const toast: ToastMessage = {
      id,
      type,
      title,
      message,
      duration
    };

    this.toasts.push(toast);

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }

  remove(id: string): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  clear(): void {
    this.toasts = [];
  }
}