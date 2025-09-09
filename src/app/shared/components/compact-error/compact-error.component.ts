import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-compact-error',
    imports: [CommonModule],
    template: `
    <div class="compact-error-content d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <i [class]="iconClass" class="me-2"></i>
        <span class="compact-error-message">{{ message }}</span>
      </div>
      <button 
        *ngIf="showRetryButton" 
        type="button" 
        class="btn btn-outline-danger btn-sm"
        (click)="onRetry()"
        title="Tentar novamente">
        <i class="fa fa-refresh"></i>
      </button>
    </div>
  `,
    styles: [`
    .compact-error-content {
      background-color: #fff5f5;
      border: 1px solid #fed7d7;
      border-radius: 6px;
      padding: 0.75rem 1rem;
      margin: 0.75rem;
      min-height: 48px;
    }

    .compact-error-message {
      color: #e53e3e;
      font-size: 0.9rem;
      font-weight: 500;
      word-break: break-word;
    }

    .fa-exclamation-triangle {
      color: #e53e3e;
      font-size: 1.1rem;
    }

    .btn-outline-danger {
      border-width: 1px;
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
    }

    .btn-outline-danger:hover {
      background-color: #e53e3e;
      border-color: #e53e3e;
    }
  `]
})
export class CompactErrorComponent {
    // Inputs
    @Input() iconClass: string = 'fa fa-exclamation-triangle';
    @Input() message: string = '';
    @Input() showRetryButton: boolean = false;

    // Callback para o botão de retry
    @Input() onRetryCallback?: () => void;

    onRetry(): void {
        if (this.onRetryCallback) {
            this.onRetryCallback();
        }
    }
}