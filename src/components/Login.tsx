import { useState, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "../styles/login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submissionMessage, setSubmissionMessage] = useState<string>("");

  const handleRememberMe = (email: string, rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  };

  const handleFocusOnError = (errors: any) => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorField = errorKeys[0];
      fieldRefs[firstErrorField]?.current?.focus();
    }
  };

  const fieldRefs: any = {
    email: useRef<HTMLInputElement>(null),

    password: useRef<HTMLInputElement>(null),
  };

  const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};

    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const onSubmit = (
    values: { email: string; password: string; rememberMe: boolean },
    { setSubmitting, errors }: any
  ) => {
    console.log("Logging in user:", values);
    if (Object.keys(errors).length > 0) {
      handleFocusOnError(errors);
      setSubmitting(false);
    } else {
      console.log("Form submitted successfully:", values);
    }

    handleRememberMe(values.email, values.rememberMe);

    setTimeout(() => {
      setSubmissionMessage("Login Successful!");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-header">Login</h2>

        <Formik
          initialValues={{ email: "", password: "", rememberMe: false }}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  required
                  aria-required="true"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                  innerRef={fieldRefs.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("email", e.target.value);
                  }}
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-container">
                  <Field
                    aria-required="true"
                    required
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="form-control"
                    innerRef={fieldRefs.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("password", e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="rememberMe" className="remember-me-label">
                  <Field
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    className="remember-me-checkbox"
                  />
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              {submissionMessage && (
                <div className="success-message">{submissionMessage}</div>
              )}
            </Form>
          )}
        </Formik>

        <p className="register-link">
          Don't have an account? <a href="/signup">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
