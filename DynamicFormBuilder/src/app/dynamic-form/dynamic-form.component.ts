import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: false,
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() schema: any;
  @Output() formSubmit = new EventEmitter<any>();
  form: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    if (!this.schema || !this.schema.fields) return;
    for (const field of this.schema.fields) {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.validation && field.validation.pattern) {
        validators.push(Validators.pattern(field.validation.pattern));
      }
      let defaultValue: any = '';
      if (field.type === 'checkbox') defaultValue = false;
      if (field.type === 'multiselect') defaultValue = [];
      this.form.addControl(field.name, this.fb.control(defaultValue, validators));
    }
  }

  isFieldVisible(field: any): boolean {
    if (!field.visibleIf) return true;
    const depField = field.visibleIf.field;
    const depValue = field.visibleIf.value;
    return this.form.get(depField)?.value === depValue;
  }

  getErrorMessage(field: any): string {
    const control = this.form.get(field.name);
    if (!control || !control.errors) return '';
    if (control.errors['required']) return `${field.label} is required.`;
    if (control.errors['pattern']) return field.validation?.message || 'Invalid format.';
    return '';
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
