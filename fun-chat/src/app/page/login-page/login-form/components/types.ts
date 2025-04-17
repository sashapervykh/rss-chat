export interface InputLabelParameters {
  type: 'Name' | 'Password';
}

export interface ValidationCriteria {
  minlength: number;
  pattern: RegExp;
}

export interface DataForCheck {
  withNotice: boolean;
  value: string;
  criteria: ValidationCriteria;
}
