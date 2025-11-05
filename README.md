# Dynamic Form Renderer (Angular)

## Overview
This application demonstrates a dynamic form renderer built with Angular. The form component renders fields based on a configurable JSON schema, supports multiple field types, validations, conditional rendering, and more.

## Features
- Dynamic form rendering from JSON schema
- Supports text, textarea, date, dropdown, multi-select, checkbox
- Validation (required, pattern, custom messages)
- Conditional field rendering
- Readonly, disabled, hidden attributes
- Configurable error messages and placeholders
- Displays submitted form data on screen

## Steps to Run the Application
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm start
   ```
3. Open your browser and navigate to `http://localhost:4200`

## JSON Schema Format
Each form schema is a JSON object with a `title` and an array of `fields`. Example:

```json
{
  "title": "User Registration",
  "fields": [
    { "label": "Full Name", "name": "fullName", "type": "text", "required": true },
    { "label": "Email", "name": "email", "type": "text", "required": true, "validation": { "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", "message": "Invalid email address" } },
    { "label": "Date of Birth", "name": "dob", "type": "date" },
    { "label": "Gender", "name": "gender", "type": "dropdown", "options": ["Male", "Female", "Other"], "required": true },
    { "label": "Hobbies", "name": "hobbies", "type": "multiselect", "options": ["Reading", "Sports", "Music", "Travel"] },
    { "label": "Subscribe to newsletter", "name": "subscribe", "type": "checkbox" },
    { "label": "About Yourself", "name": "about", "type": "textarea" }
  ]
}
```

### Supported Field Properties
- `label`: Field label
- `name`: Unique field name
- `type`: One of `text`, `textarea`, `date`, `dropdown`, `multiselect`, `checkbox`
- `required`: Boolean
- `options`: Array (for dropdown/multiselect)
- `validation`: `{ pattern, message, requiredMessage }`
- `placeholder`: String
- `readonly`, `disabled`, `hidden`: Boolean
- `visibleIf`: `{ field, value }` (conditional rendering)

## Example Schemas

### 1. User Registration
```json
{
  "title": "User Registration",
  "fields": [
    { "label": "Full Name", "name": "fullName", "type": "text", "required": true },
    { "label": "Email", "name": "email", "type": "text", "required": true, "validation": { "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", "message": "Invalid email address" } },
    { "label": "Date of Birth", "name": "dob", "type": "date" },
    { "label": "Gender", "name": "gender", "type": "dropdown", "options": ["Male", "Female", "Other"], "required": true },
    { "label": "Hobbies", "name": "hobbies", "type": "multiselect", "options": ["Reading", "Sports", "Music", "Travel"] },
    { "label": "Subscribe to newsletter", "name": "subscribe", "type": "checkbox" },
    { "label": "About Yourself", "name": "about", "type": "textarea" }
  ]
}
```

### 2. Feedback Form
```json
{
  "title": "Feedback",
  "fields": [
    { "label": "Name", "name": "name", "type": "text", "required": true },
    { "label": "Email", "name": "email", "type": "text", "validation": { "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", "message": "Invalid email address" } },
    { "label": "Rating", "name": "rating", "type": "dropdown", "options": ["Excellent", "Good", "Average", "Poor"], "required": true },
    { "label": "Comments", "name": "comments", "type": "textarea", "placeholder": "Your feedback..." },
    { "label": "Would you recommend us?", "name": "recommend", "type": "checkbox" }
  ]
}
```

## Example Output
Submitted form data will be displayed on screen as formatted JSON:

```
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "dob": "1990-01-01",
  "gender": "Male",
  "hobbies": ["Reading", "Music"],
  "subscribe": true,
  "about": "I am a developer."
}
```

Or logged to the browser console.

---
