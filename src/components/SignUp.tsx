import React, { useState, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "../styles/signUp.css";

const SignUpForm = () => {
  const [submissionMessage, setSubmissionMessage] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const fieldRefs: any = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneRegex = /^[0-9]{10}$/;

  const validate = (values: typeof initialValues) => {
    const errors: any = {};

    if (!values.firstName) errors.firstName = "First name is required";
    if (!values.lastName) errors.lastName = "Last name is required";
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "Phone number must be exactly 10 digits";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters, include a letter, a number, and a special character.";
    }
    if (values.password !== values.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    return errors;
  };

  const calculatePasswordStrength = (password: string) => {
    if (password.length < 8) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return "Medium";
    if (
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/) &&
      password.match(/[@$!%*?&]/)
    )
      return "Strong";
    return "Weak";
  };

  const handleFocusOnError = (errors: any) => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorField = errorKeys[0];
      fieldRefs[firstErrorField]?.current?.focus();
    }
  };

  const onSubmit = (
    values: typeof initialValues,
    { setSubmitting, errors }: any
  ) => {
    if (Object.keys(errors).length > 0) {
      handleFocusOnError(errors);
      setSubmitting(false);
    } else {
      console.log("Form submitted successfully:", values);
    }
    setTimeout(() => {
      setSubmissionMessage("Sign Up Successful!");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container" role="form" aria-labelledby="form-title">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, errors, isSubmitting }) => (
          <Form className="form-wrapper">
            <div className="title">Sign Up your account</div>

            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <Field
                aria-required="true"
                required
                type="text"
                id="firstName"
                name="firstName"
                innerRef={fieldRefs.firstName}
                className="form-control"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("firstName", e.target.value);
                }}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error"
              />
            </div>

            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <Field
                aria-required="true"
                required
                type="text"
                id="lastName"
                name="lastName"
                innerRef={fieldRefs.lastName}
                className="form-control"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("lastName", e.target.value);
                }}
              />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <Field
                aria-required="true"
                required
                type="email"
                id="email"
                name="email"
                innerRef={fieldRefs.email}
                className="form-control"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("email", e.target.value);
                }}
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Field as="select" id="countryCode" name="countryCode">
                  <option value="">Select Code</option>
                  <option value="91">+91 (India)</option>
                  <option value="92">+92 (Pakistan)</option>
                  <option value="93">+93 (Bangladesh)</option>
                </Field>
                <Field
                  required
                  aria-required="true"
                  type="number"
                  id="phone"
                  name="phone"
                  innerRef={fieldRefs.phone}
                  className="form-control"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("phone", e.target.value);
                  }}
                />
              </div>
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <Field
                required
                aria-required="true"
                type="password"
                id="password"
                name="password"
                innerRef={fieldRefs.password}
                className="form-control"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("password", e.target.value);
                  setPasswordStrength(
                    calculatePasswordStrength(e.target.value)
                  );
                }}
              />
              <ErrorMessage name="password" component="div" className="error" />
              {passwordStrength && (
                <div
                  className={`password-strength ${passwordStrength.toLowerCase()}`}
                >
                  Strength: {passwordStrength}
                </div>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                innerRef={fieldRefs.confirmPassword}
                className="form-control"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("confirmPassword", e.target.value);
                }}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>

            <button type="submit" className="button" disabled={isSubmitting}>
              Sign Up
            </button>

            {Object.keys(errors).length > 0 && (
              <div className="error-list">
                <ul>
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {submissionMessage && (
              <div className="success-message">{submissionMessage}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
