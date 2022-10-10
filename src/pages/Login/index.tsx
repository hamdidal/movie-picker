import React, { useState } from "react";
import "./Login.css";
import { Form, notification } from "antd";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { login } from "../../services/auth";
import { Formik } from "formik";
import * as YUP from 'yup'


const initialValues = {
  email: "",
  password: "",
};

const validationSchema: any = () => {
  return YUP.object().shape({
    email: YUP.string().email("Email is invalid").required("Email is required"),
    password: YUP.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 100 },
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toRegisterPage = () => {
    navigate("/register");
  };

  const toLogin = async (values: any) => {
    debugger
    setLoading(true);
    try {
      login(values.email, values.password);
      navigate("/");
    } catch (e) {
      console.log(e);
      notification.open({
        message: "Login Error",
        type: "error",
        description: "Email or password is wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-login">
      <Formik
        initialValues={initialValues}
        onSubmit={toLogin}
        validationSchema={validationSchema}
        validateOnChange={true}
      >
        {({ errors, touched, handleChange, handleSubmit, handleBlur }) => (
          <Form className="login-form" {...layout}>
            <div className="login-title">Login</div>
            {loading && <Loading />}
            <div className="inputs">
              <Form.Item
                validateStatus={
                  errors.email && touched.email ? "error" : "success"
                }
              >
                <input
                  className="email-input"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
              >
                <input
                  className="password-input"
                  autoComplete="new-password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </Form.Item>
              <Form.Item className="button">
                <button className="login-btn" onClick={() => handleSubmit()}>
                  Login
                </button>
                <div className="register" onClick={toRegisterPage}>
                  Don't have an account?{" "}
                  <span className="request">Request now!</span>{" "}
                </div>
              </Form.Item>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Login