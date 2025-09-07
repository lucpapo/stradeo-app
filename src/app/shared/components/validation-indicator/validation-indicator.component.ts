import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ValidationService } from '../../validation/validation.service';
import { ValidationConfig } from '../../validation/validation-config.interface';
import { ToastService } from '../../../corepcode/toast/toast.service';

@Component({
  selector: 'app-validation-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="hasErrors" 
         class="validation-indicator" 
         (click)="showErrors()"
         title="Clique para ver os erros de validação">
      <i class="fa fa-exclamation-circle"></i>
      <span class="error-badge">{{ errorCount }}</span>
    </div>
  `,
  styles: [`
    .validation-indicator {
      position: absolute;
      top: -8px;
      left: -8px;
      cursor: pointer;
      z-index: 10;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .validation-indicator:hover {
      transform: scale(1.1);
    }

    .validation-indicator i {
      color: #dc3545;
      font-size: 20px;
      position: relative;
    }

    .error-badge {
      position: absolute;
      top: -4px;
      right: -10px;
      background: #dc3545;
      color: white;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      font-weight: bold;
      border: 2px solid white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
  `]
})
export class ValidationIndicatorComponent {
  @Input() form!: FormGroup;
  @Input() validationConfig!: ValidationConfig;
  @Input() fieldLabels!: { [key: string]: string };

  constructor(
    private validationService: ValidationService,
    private toastService: ToastService
  ) {}

  get hasErrors(): boolean {
    return this.validationService.hasFormErrors(this.form);
  }

  get errorCount(): number {
    return this.validationService.getFormErrors(this.form, this.validationConfig, this.fieldLabels).length;
  }

  showErrors(): void {
    const errors = this.validationService.getFormErrors(this.form, this.validationConfig, this.fieldLabels);
    
    if (errors.length > 0) {
      const errorMessage = errors.map(error => `• ${error.fieldLabel}: ${error.message}`).join('\n');
      
      this.toastService.danger(errorMessage, {
        title: 'Erros de Validação',
        delay: 8000,
        position: 'top-end'
      });
    }
  }
}