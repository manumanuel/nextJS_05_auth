# User Authentication

## Login

## Training

### Notes

- must add 'use server' for declaring any function as a server function
- server function must be declared as 'async' functions

- useFormState from 'react-dom' is a custom hook that manages form state
  - should mark the page with 'use client' [useFormState is only work in client side]
  - used to handle the state of form inputs, validations, form-related logic
  - eg : const [formState, formAction] = useFormState(actionName, {});
  - actionName is the server action defined - {} can hold initial values, if any
  - formAction will act as a wrapper for the defined action, also it will bind with form's action tag
    ie <form id="auth-form" action={formAction}> </form>
  - formState represents the response getting back from the server action
