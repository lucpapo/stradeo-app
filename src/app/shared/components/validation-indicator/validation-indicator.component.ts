import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastService } from '@pcode/toast/toast.service';

interface ValidationError {
  field: string;
  label: string;
  message: string;
}

@Component({
  standalone: true,
  selector: 'app-validation-indicator',
  imports: [CommonModule],
  template: `
    <div class="validation-indicator" *ngIf="hasErrors">
      <!-- Ícone flutuante com contador de erros -->
      <div 
        class="error-badge" 
        [title]="'Clique para ver os ' + errorCount + ' erro(s)'"
        (click)="showErrors()">
        <i class="fa fa-exclamation-triangle"></i>
        <span class="error-count">{{ errorCount }}</span>
      </div>
    </div>
  `,
  styles: [`
    .validation-indicator {
      position: relative;
    }

    .error-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #dc3545;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      z-index: 10;
      transition: all 0.2s ease;
    }

    .error-badge:hover {
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
    }

    .error-count {
      position: absolute;
      top: -2px;
      right: -2px;
      background: #fff;
      color: #dc3545;
      border-radius: 50%;
      width: 14px;
      height: 14px;
      font-size: 8px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #dc3545;
    }

    /* Borda vermelha no container pai quando há erros */
    :host-context(.has-validation-errors) {
      border-left: 4px solid #dc3545 !important;
    }
  `]
})
export class ValidationIndicatorComponent {
  @Input() form!: FormGroup;
  @Input() fieldLabels: { [key: string]: string } = {};
  
  private readonly toastService = inject(ToastService);

  get hasErrors(): boolean {
    return this.form && this.form.invalid && this.form.touched;
  }

  get errorCount(): number {
    if (!this.form) return 0;
    
    let count = 0;
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.invalid && control.touched) {
        count++;
      }
    });
    return count;
  }

  get errors(): ValidationError[] {
    if (!this.form) return [];

    const errors: ValidationError[] = [];
    
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.invalid && control.touched) {
        const label = this.fieldLabels[key] || key;
        const controlErrors = control.errors;
        
        if (controlErrors) {
          Object.keys(controlErrors).forEach(errorKey => {
            let message = '';
            
            switch (errorKey) {
              case 'required':
                message = `${label} é obrigatório`;
                break;
              case 'maxlength':
                const maxLength = controlErrors[errorKey].requiredLength;
                message = `${label} não pode ter mais de ${maxLength} caracteres`;
                break;
              case 'minlength':
                const minLength = controlErrors[errorKey].requiredLength;
                message = `${label} deve ter pelo menos ${minLength} caracteres`;
                break;
              case 'email':
                message = `${label} deve ser um email válido`;
                break;
              case 'pattern':
                message = `${label} tem formato inválido`;
                break;
              default:
                message = `${label} é inválido`;
            }
            
            errors.push({
              field: key,
              label,
              message
            });
          });
        }
      }
    });
    
    return errors;
  }

  showErrors(): void {
    if (this.errors.length === 0) return;

    const errorMessages = this.errors.map(error => `• ${error.message}`).join('\n');
    
    this.toastService.danger(errorMessages, {
      title: 'Erros de validação encontrados',
      delay: 8000,
      position: 'top-end'
    });
  }
}