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

  success(title: string, message: string, duration: number = 5000, clearPrevious: boolean = false): void {
    this.show('success', title, message, duration, clearPrevious);
  }

  error(title: string, message: string, duration: number = 8000, clearPrevious: boolean = false): void {
    this.show('error', title, message, duration, clearPrevious);
  }

  warning(title: string, message: string, duration: number = 6000, clearPrevious: boolean = false): void {
    this.show('warning', title, message, duration, clearPrevious);
  }

  info(title: string, message: string, duration: number = 5000, clearPrevious: boolean = false): void {
    this.show('info', title, message, duration, clearPrevious);
  }

  private show(type: ToastMessage['type'], title: string, message: string, duration: number, clearPrevious: boolean = false): void {
    // Limpa toasts anteriores se solicitado
    if (clearPrevious) {
      this.clear();
    }

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