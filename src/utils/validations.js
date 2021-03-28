import { string, number, boolean, date, array, object, ref } from 'yup';


export const firstName = string()
    .required("This field is required")
    .min(1, "Must be at least 1 characters")
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
    .required("This field is required")
    .min(1, "Must be at least 1 characters")
    .max(100, "Must be a maximum of 30 characters");

export const aboutMe = string()
    .required("This field is required")
    .min(100, "Must be at least 100 characters")
    .max(1500, "Must be a maximum of 1500 characters");

export const minimumIncome = boolean()
    .required("This field is required")