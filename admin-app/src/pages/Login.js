import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { login } from '../features/auth/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let userSchema = Yup.object({
    email: Yup.string()
      .email('Email Should Valid')
      .required('Email is Required'),
    password: Yup.string().required('Password is Required')
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values))
    }
  })

  const authState = useSelector((state) => state)
  const { user, isError, isLoading, isSuccess, message } = authState.auth

  useEffect(() => {
    if (isSuccess) {
      navigate('admin')
    } else {
      navigate('')
    }
  }, [user, isError, isLoading, isSuccess, message, navigate])

  return (
    <div className="py-5" style={{ background: '#ffd333', minHeight: '100vh' }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <div className="error text-center">
          {message.message === 'Rejected' ? 'You are not an Admin' : ''}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="email"
            name="email"
            label="Email Address"
            id="email"
            onCh={formik.handleChange('email')}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            id="pass"
            onCh={formik.handleChange('password')}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: '#ffd333' }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
