import { useState } from 'react';
import styles from './login.module.css'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setRole } from '../../redux/reducerSlice/userSlice'
import { useFormik, Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { useRouter } from "next/router";
import { Button, message } from 'antd';
const initialValues = {
    email: '',
    password: ''
  }
  
  const SigninSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required')
      .typeError('must be a email'),
      
    //   .test('checkLength', 'the number should exactly be 10 digits', val => val.toString().length == 10)
      
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });
const Login  = ()=>{
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
  
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.user)
  
    const handleLogin = async (values) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password })
      };
      try {
        const res = await fetch('http://localhost:4000/login', requestOptions)
        const data = await res.json()
        if (data.success) {
          message.success("login successful");
          dispatch(setToken(data.token))
          dispatch(setRole(data.role))
        } else {
          message.error("login failed, try again");
        }
      } catch (err) {
        // error tracking tools
        messageApi.warning('Server issues, try again');
      }
    }
  
    const handleCreateClick = () => {
      router.push('/register')
    };
  
  
  
  
    return (
        <>
        <div className={styles.main}>
        <div className={styles.navTitle}>
        <div>Universalshop</div>
        
        </div>
  
          <Formik
            initialValues={initialValues}
            validationSchema={SigninSchema}
            onSubmit={handleLogin}
          >
  
            {({ errors, touched }) => (
              <Form className={styles.form}>
                <p className={styles.formTitle}>Sign in</p>
                <div className={styles.logoUNIVERSALSHOP}>
              <img src=''className={styles.imageLogo}/>
            </div>
                <label htmlFor="email" className={styles.formLabel}>email</label>
                <Field name="email" className={styles.input} />
                {errors.email && touched.email ? <div className={styles.errorMessage}>{errors.email}</div> : null}
  
                <label htmlFor="password" className={styles.formLabel}>Password</label>
                <Field name="password" type="password" placeholder="At least 6 character" className={styles.input} />
                {errors.password && touched.password ? <div className={styles.errorMessage}>{errors.password}</div> : null}
  
                <button type="submit" className={styles.loginRegisterButton}>
                  Continue
                </button>
              </Form>
            )}
          </Formik>
          {contextHolder}
  
  
          <div className={styles.createAccountContainer}>
            <div className={styles.dividerContainer}>
              <div className={styles.line}></div>
              <div className={styles.registerHint}>New to Universalshop?</div>
              <div className={styles.line}></div>
            </div>
  
            <button className={styles.createAccountButton} onClick={handleCreateClick}>Create your Universalshop account</button>
  
            <div className={styles.fadingLine}>
            </div>
          </div>
        </div>
        </>
      )
}
export default Login