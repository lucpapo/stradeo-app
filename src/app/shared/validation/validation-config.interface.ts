export interface ValidationRule {
  field: string;
  validatorType: string;
  message: string;
}

export interface ValidationConfig {
  [fieldName: string]: ValidationRule[];
}

export interface ValidationError {
  field: string;
  fieldLabel: string;
  message: string;
}