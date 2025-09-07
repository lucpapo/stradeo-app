import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-error-state',
    imports: [CommonModule],
    template: `
    <div class="error-state-content text-center py-4">
      <div class="error-state-icon mb-3">
        <i [class]="iconClass" style="font-size: 2.5rem;"></i>
      </div>
      <h6 class="error-state-title mb-2">{{ title }}</h6>
      <p class="error-state-message mb-3">{{ message }}</p>
      <p class="error-state-hint text-muted small" *ngIf="hint">{{ hint }}</p>
      <button 
        *ngIf="showRetryButton" 
        type="button" 
        class="btn btn-outline-danger btn-sm"
        (click)="onRetry()">
        <i class="fa fa-refresh me-1"></i>{{ retryButtonText }}
      </button>
    </div>
  `,
    styles: [`
    .error-state-content {
      width: 100%;
      background-color: #fff5f5;
      border: 1px solid #fed7d7;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 0.5rem 0;
    }

    .error-state-icon {
      display: inline-block;
    }

    .error-state-title {
      color: #c53030;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .error-state-message {
      color: #e53e3e;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
      word-break: break-word;
    }

    .error-state-hint {
      color: #a0aec0;
      font-size: 0.8rem;
      font-style: italic;
    }

    .btn-outline-danger:hover {
      background-color: #e53e3e;
      border-color: #e53e3e;
    }
  `]
})
export class ErrorStateComponent {
    // Inputs
    @Input() iconClass: string = 'fa fa-exclamation-triangle text-danger';
    @Input() title: string = 'Ops! Algo deu errado';
    @Input() message: string = '';
    @Input() hint: string = 'Tente novamente em alguns instantes ou entre em contato com o suporte.';
    @Input() showRetryButton: boolean = false;
    @Input() retryButtonText: string = 'Tentar novamente';

    // Callback para o botão de retry
    @Input() onRetryCallback?: () => void;

    onRetry(): void {
        if (this.onRetryCallback) {
            this.onRetryCallback();
        }
    }
}