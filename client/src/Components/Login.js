import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import { makeStyles } from '@material-ui/styles'
import { Link, useHistory } from 'react-router-dom'

import validateEmail from '../utils/validateEmail'
import { AuthContext } from '../Contexts/Auth.context'
import Error from './Error'

const initialValues = {
  email: '',
  password: ''
}

const validate = (values) => {
  const errors = {}

  if (!values.email) errors.email = 'Email is required'
  else if (!validateEmail(values.email)) errors.email = 'Email is invalid'

  if (!values.password) errors.password = 'Password is required'

  return errors
}

const useStyles = makeStyles({
  'form-container': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '600px',
    margin: '50px auto',
    padding: '12px',
    background: 'white',
    boxShadow: '0px 0px 8px 4px rgba(0, 0, 0, .2)'
  },
  'form-title': {
    textTransform: 'uppercase',
    fontSize: '24px',
    letterSpacing: '2px'
  },
  'form': {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'form-item': {
    width: '100%',
    margin: '12px',
    padding: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  'form-input': {
    width: '100%',
    fontSize: '14px',
    padding: '8px 4px',
    outline: 'none',
    borderRadius: '4px',
    '&:focus': {
      background: '#b8a3a314'
    }
  },
  'form-label': {
    margin: '0 0 8px 0',
    display: 'inline-block',
    fontSize: '14px',
    fontStyle: 'oblique',
    letterSpacing: '1px'
  },
  'form-input-error': {
    margin: '4px 0',
    fontSize: '10px',
    fontWeight: '500',
    fontStyle: 'italic',
    color: 'red'
  },
  'form-submit': {
    width: '50%',
    margin: 'auto',
    background: '#0165b1cf',
    border: 'none',
    outline: 'none',
    borderRadius: '4px',
    color: 'white',
    fontSize: '16px',
    padding: '8px',
    cursor: 'pointer',
    '&:hover': {
      background: '#0165b1fa'
    }
  },
  'message': {
    fontSize: '12px',
    fontWeight: '500',
    fontStyle: 'italic',
    wordSpacing: '1px',
    '& a': {
      textDecoration: 'none',
      color: 'blue'
    }
  }
})

const Login = () => {
  const history = useHistory()
  const { login } = useContext(AuthContext)
  const classes = useStyles()
  const [formSumbitError, setFormSubmitError] = useState('')

  const onSubmit = async (values) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      const data = await res.json()

      if (!res.ok) setFormSubmitError(data.message)
      else {
        handleReset()
        setFormSubmitError('')
        login(data)
        history.replace('/projects')
      }
    } catch (err) {
      console.log(err)
      setFormSubmitError('Unable to Connect to the Server. Please try after sometime.')
    }
    setTimeout(() => {
      setFormSubmitError('')
    }, 4000);
  }


  const {
    values, errors, touched,
    handleChange, handleBlur, handleSubmit,
    handleReset
  } = useFormik({ initialValues, validate, onSubmit })


  return (
    <>
      {formSumbitError && <Error message={formSumbitError} />}
      <div className={classes['form-container']}>
        <div className={classes['form-title']}>Login</div>
        <form onSubmit={handleSubmit} className={classes['form']}>
          <div className={classes['form-item']}>
            <label htmlFor="email" className={classes['form-label']}>Email</label>
            <input className={classes['form-input']} type="email" name="email" placeholder="Enter your Email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
            {(touched.email && errors.email) && <p className={classes['form-input-error']}><sup>*</sup>{errors.email}</p>}
          </div>
          <div className={classes['form-item']}>
            <label htmlFor="password" className={classes['form-label']}>Password</label>
            <input className={classes['form-input']} type="password" name="password" placeholder="Enter your Password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
            {(touched.password && errors.password) && <p className={classes['form-input-error']}><sup>*</sup>{errors.password}</p>}
          </div>
          <div className={classes['form-item']}>
            <button className={classes['form-submit']} type="submit">Submit</button>
          </div>
        </form>
        <div className={classes['message']}>
          Need an Account? <span><Link to="/register">Register ???</Link></span>
        </div>
      </div>
    </>
  )
}

export default Login