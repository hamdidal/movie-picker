import React, { useState } from "react";
import "./Register.css";
import { Form, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import Loading from "../../components/Loading";
import { Formik } from "formik";
import * as YUP from 'yup'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema: any = () => {
  return YUP.object().shape({
    email: YUP.string().required('Email is required').email('Email is invalid'),
    password: YUP.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  })
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 100 },
}

const Register: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
  
    const toLoginPage = () => {
      navigate('/login')
    }
  
    const toRegister = async (values:any) => {
      setLoading(true)
      try {
        await register(values.email, values.password)
        navigate('/')
      } catch (error) {
        notification.open({
          message: 'Register Error',
          type: 'warning',
          description: 'Please provide all required information above!'
        })
      }
        setLoading(false)
        console.log(register(values.email, values.password))
      }
      return (
    <div className="container-register">
      <Formik
      initialValues={initialValues}
      onSubmit={toRegister}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {({ errors, touched, handleChange, handleSubmit, handleBlur }) => (
      <Form className="reg-form" {...layout}>
        <div className="reg-title">Register</div>
        {loading && <Loading/>}
        <div className="reg-inputs">
          <Form.Item validateStatus={errors.email && touched.email ? 'error' : 'success'}>
            <input
              className="reg-email-input"
              type="email"
              name="email"
              placeholder="Enter Email Address"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </Form.Item>
          <Form.Item validateStatus={errors.password && touched.password ? 'error' : 'success'}>
            <input
              className="reg-password-input"
              autoComplete="new-password"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
          </Form.Item>
          <Form.Item>
            <button type="button" className="reg-btn" onClick={() => handleSubmit()}>Sign In</button>
            <div className="register-reg" onClick={toLoginPage}>
              Do you have an account? <span className="request-reg">Login!</span>
            </div>
          </Form.Item>
        </div>
      </Form>
      )}
      </Formik>
      </div>
      )}

export default Register
