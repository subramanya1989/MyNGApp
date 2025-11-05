import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

interface Validation {
    pattern: string;
    message: string;
}

interface FormField {
    label: string;
    name: string;
    type: 'text' | 'date' | 'dropdown' | 'multiselect' | 'checkbox' | 'textarea';
    required?: boolean;
    placeholder?: string;
    readonly?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    visibleIf?: { field: string; value: any };
    validation?: Validation;
    options?: string[];
}

interface FormSchema {
    title: string;
    fields: FormField[];
}

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: [`./app.component.scss`],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
    formSchema1: FormSchema | null = null; 
    formSchema2: FormSchema | null = null;
    activeSchema: FormSchema | null = null;
    submittedData: any = null;
    isUserRegistrationSchema: boolean;

    ngOnInit(): void {        
        this.formSchema1 = {
            title: 'User Registration',
            fields: [
                { label: 'Full Name', name: 'fullName', type: 'text', required: true },
                { label: 'Email', name: 'email', type: 'text', required: true, validation: { pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', message: 'Invalid email address' } },
                { label: 'Date of Birth', name: 'dob', type: 'date' },
                { label: 'Gender', name: 'gender', type: 'dropdown', options: ['Male', 'Female', 'Other'], required: true },
                { label: 'Hobbies', name: 'hobbies', type: 'multiselect', options: ['Reading', 'Sports', 'Music', 'Travel'] },
                { label: 'Subscribe to newsletter', name: 'subscribe', type: 'checkbox' },
                { label: 'About Yourself', name: 'about', type: 'textarea' }
            ]
        };
        this.formSchema2 = {
            title: 'Feedback',
            fields: [
                { label: 'Name', name: 'name', type: 'text', required: true },
                { label: 'Email', name: 'email', type: 'text', validation: { pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', message: 'Invalid email address' } },
                { label: 'Rating', name: 'rating', type: 'dropdown', options: ['Excellent', 'Good', 'Average', 'Poor'], required: true },
                { label: 'Comments', name: 'comments', type: 'textarea', placeholder: 'Your feedback...' },
                { label: 'Would you recommend us?', name: 'recommend', type: 'checkbox' }
            ]
        };
        this.toggleSchema();
    }

    toggleSchema() {
        this.activeSchema = null;
        this.submittedData = null;
        this.isUserRegistrationSchema = !this.isUserRegistrationSchema;
        setTimeout(() => {
            this.activeSchema = this.isUserRegistrationSchema ? this.formSchema1 : this.formSchema2;
        });
    }

    onFormSubmit(value: any) {
        this.submittedData = value;
        console.log('Form submitted:', value);
    }
    ngOnDestroy(): void {
        this.formSchema1 = null;
        this.formSchema2 = null;
        this.activeSchema = null;
        this.submittedData = null;
    }
}
