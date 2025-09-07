import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationConfig, ValidationError } from './validation-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  getFormErrors(form: FormGroup, validationConfig: ValidationConfig, fieldLabels: { [key: string]: string }): ValidationError[] {
    const errors: ValidationError[] = [];

    Object.keys(validationConfig).forEach(fieldName => {
      const control = form.get(fieldName);
      if (control && control.invalid && control.touched) {
        const fieldRules = validationConfig[fieldName];
        
        fieldRules.forEach(rule => {
          if (control.hasError(rule.validatorType)) {
            errors.push({
              field: fieldName,
              fieldLabel: fieldLabels[fieldName] || fieldName,
              message: rule.message
            });
          }
        });
      }
    });

    return errors;
  }

  hasFormErrors(form: FormGroup): boolean {
    return form.invalid && form.touched;
  }

  getFieldErrorClass(form: FormGroup, fieldName: string): string {
    const control = form.get(fieldName);
    if (control && control.invalid && control.touched) {
      return 'field-error';
    }
    return '';
  }

  // Método auxiliar para validações customizadas
  addCustomValidationMessage(fieldName: string, validatorType: string, message: string, validationConfig: ValidationConfig): void {
    if (!validationConfig[fieldName]) {
      validationConfig[fieldName] = [];
    }
    
    validationConfig[fieldName].push({
      field: fieldName,
      validatorType,
      message
    });
  }

  // Método para validar um campo específico
  getFieldErrors(form: FormGroup, fieldName: string, validationConfig: ValidationConfig, fieldLabels: { [key: string]: string }): string[] {
    const control = form.get(fieldName);
    const errors: string[] = [];

    if (control && control.invalid && control.touched && validationConfig[fieldName]) {
      const fieldRules = validationConfig[fieldName];
      
      fieldRules.forEach(rule => {
        if (control.hasError(rule.validatorType)) {
          errors.push(rule.message);
        }
      });
    }

    return errors;
  }
}