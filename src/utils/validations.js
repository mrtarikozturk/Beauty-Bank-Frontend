import { string, number, boolean, date, array, object, ref } from 'yup';


export const firstName = string()
    .required("This field is required")
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be a maximum of 30 characters");

export const lastName = string()
    .required("This field is required")
    .min(1, "Must be at least 1 characters")
    .max(30, "Must be a maximum of 30 characters");

export const userName = string()
    .required("This field is required")
    .min(1, "Must be at least 1 characters")
    .max(30, "Must be a maximum of 30 characters");

export const email = string()
    .required("This field is required")
    .email("Invalid e-mail")
    .min(4, "Must be at least 4 characters")
    .max(30, "Must be a maximum of 30 characters");

export const phone = string()
    .required("This field is required")
    .min(1, "Must be at least 1 characters")
    .max(20, "Must be a maximum of 20 characters");

export const zipAddress = string()
    .required("This field is required")
    .min(1, "Must be at least 1 characters")
    .max(30, "Must be a maximum of 30 characters");

export const address = string()
    .typeError('This field is required')
    .required("This field is required")
    .min(1, "Must be at least 1 characters")
    .max(100, "Must be a maximum of 30 characters");

export const aboutMe = string()
    .typeError('This field is required')
    .required("This field is required")
    .min(50, "Must be at least 50 characters")
    .max(1000, "Must be a maximum of 1000 characters");

export const minimumIncome = boolean()
    .required("This field is required");

export const url = string()
    .typeError('This field is required');
// !! TODO: edit formdaki url alanlari icin regex yazilmasi gerekiyor. Simdilik  pas gectik