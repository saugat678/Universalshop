import React from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 import Link from 'next/link';
 import styles from './register.module.css';
 
 import { Button, message } from 'antd';
 const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    password: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    // phoneNumber:Yup.number()
    // .typeError('must be a number')
    // .test('checkLength', 'the number should exactly be 10 digits', val=> val.toString().length ==10 )
    //  .required('Required'),
     confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    )
    ,
    email: Yup.string().email("Invalid email").required("Required"),
    
 
 
 address: Yup.string()
    .required('Required')

})


 const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const registerUser = async(values)=> {
 
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };

  try{
    const res = await fetch('http://localhost:4000/register',requestOptions)
    const data = await res.json()
    if(res && data.success){
      messageApi.success(data.msg);
    }else{
      messageApi.error(data.msg);
    }
    }catch(err){
      console.log(err)
    }
  
   }
   const handleFileSave =(e)=> {
    console.log(e.target.files)
      setFile(e.target.files[0])}
  
   return ( 
    <div className={styles.container}>
      <Formik initialValues={{
      
      fullName: '',
          password: '',
          confirmPassword:'',
          email:'',
          address:''
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          registerUser(values);
         
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.Home_form}>
          <p className={styles.formTitle}>Signup</p>

          
          <div className={styles.switch_user}>

            <Field name="fullName" placeholder ="fullName" className={styles.Home_input} />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <br/>
            <Field name="password" placeholder="password" className={styles.Home_input} />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br/>

              <Field name="confirmPassword"  placeholder="confirm password" className={styles.Home_input} />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
            <br/>

            <Field name="email" placeholder="email" className={styles.Home_input}/>
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br/>

            <Field name="address" placeholder="address" className={styles.Home_input}/>
            {errors.address && touched.address? <div>{errors.address}</div> : null}
            <br/>
            </div>
            <input type="file" onChange={handleFileSave}/>

            <button  type="submit" className={styles.submitButton}>Submit</button>
            Already have an account yet? <Link href="/">Login</Link> instead 
          
          </Form>
        )}
      </Formik>
    </div>)
  
 }

 export default Register;