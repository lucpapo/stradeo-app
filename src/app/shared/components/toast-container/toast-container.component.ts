import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastService, ToastMessage } from '../../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-toast-container',
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1055;">
      <div 
        *ngFor="let toast of toasts" 
        class="toast show"
        [class]="getToastClass(toast.type)"
        role="alert">
        
        <div class="toast-header">
          <i class="me-2" [class]="getIconClass(toast.type)"></i>
          <strong class="me-auto">{{ toast.title }}</strong>
          <button 
            type="button" 
            class="btn-close" 
            (click)="removeToast(toast.id)"
            aria-label="Close">
          </button>
        </div>
        
        <div class="toast-body" [innerHTML]="formatMessage(toast.message)">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      max-width: 400px;
    }
    
    .toast {
      margin-bottom: 0.5rem;
      border-left: 4px solid;
    }
    
    .toast.toast-success {
      border-left-color: #198754;
    }
    
    .toast.toast-error {
      border-left-color: #dc3545;
    }
    
    .toast.toast-warning {
      border-left-color: #ffc107;
    }
    
    .toast.toast-info {
      border-left-color: #0dcaf0;
    }
    
    .toast-body {
      white-space: pre-line;
      font-size: 0.875rem;
    }
  `]
})
export class ToastContainerComponent {
  private readonly toastService = inject(ToastService);

  get toasts(): ToastMessage[] {
    return this.toastService.getToasts();
  }

  removeToast(id: string): void {
    this.toastService.remove(id);
  }

  getToastClass(type: ToastMessage['type']): string {
    return `toast-${type}`;
  }

  getIconClass(type: ToastMessage['type']): string {
    const icons = {
      success: 'fa fa-check-circle text-success',
      error: 'fa fa-exclamation-circle text-danger',
      warning: 'fa fa-exclamation-triangle text-warning',
      info: 'fa fa-info-circle text-info'
    };
    return icons[type];
  }

  formatMessage(message: string): string {
    // Converte quebras de linha em <br> para HTML
    return message.replace(/\n/g, '<br>');
  }
}