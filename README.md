# User Authentication

## Login

- install 3rd party package 'lucia' for authentication
  - npm install lucia @lucia-auth/adapter-sqlite
  - using sqlite adapter, create a session
  - verify session
  - call 'verifysession' api from protected pages

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

- searchParams is the default query params

- to achieve nested routing we are using '(RouterGroups)'
- useRouter

  - used for page rendering [entire page reload]
  - import {useRouter} from 'next/router' [in functional components, modern way]
  - import {withRouter} from 'next/router' [in class based components, older way]
  - to access the properties/ methods,

    eg: const router = useRouter();
    router.pathname [returns the path]
    router.query [returns the parameters encoded in url/nested route details ]

  - to access project files/folders dynamically, use can enclose that in []
    - eg: [id].js, [id]/index.js etc...
  - catch all routes with [...slug] (slug can be replaced with desired name)
    - when using catch all routes, router.query will returns the nested
      routes parameters as a set of array instead of string val
  - Navigating with Link
    - import Link from 'next/link'
    - eg: <Link href='/portfolio'></Link>

### Difference between userRouter & Link

- Link
  - used for declarative navigation
  - linking from one page to another in components
  - handle client side navigation automatically
- useRouter
  - used to navigate programmatically or to access current route/params from components
  - used for conditional navigation, route changes on events, getting current paths etc
