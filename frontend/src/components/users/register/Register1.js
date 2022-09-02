import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect,useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { registerUserAction } from '../../../redux/slices/users/UserSlice';
//form schema
// const formSchema = Yup.object({
//     firstName: Yup.string().required("First Name is required"),
//     lastName: Yup.string().required("Last Name is required"),
//     email: Yup.string().required("Email is required"),
//     password: Yup.string().required("Password is required"),
//     phoneNumber: Yup.string().required("phone number required")
//   });
const Register1 = () => {

    let history = useHistory()

    const routeChange=()=>{
        history.push("/login")
    }

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
          email: "",
         password: "",
        //   phoneNumber:""
        },
        onSubmit: values => {
            
            // console.log(values)

            // axios.post("http://localhost:7777/api/users/register",{
            //     firstName:"Dharun",
            //     lastName:"Sainath",
            //     email:"dharun123@gmail.com",
            //     password:"dharun",
            //     phoneNumber:"123456781"
            // }).then(res => console.log("posted data" ,res)).catch(err => console.log(err))
            // dispatch(register({firstName: values.firstName, lastName: values.lastName,email: values.email,password: "qwerty"}))
             
            
            dispatch(registerUserAction({firstName: values.firstName, lastName: values.lastName,email: values.email,password: values.password,phoneNumber:"9444805104"}));
            
            
            
        },
       
      });





  return (
    <>
    <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e)}}>
        <h3>Register account</h3>

        <div className="">
        
        <div className="flex items-center pl-6 mb-3 bg-white rounded-full p-3">
        <label htmlFor="firstName" className='px-2'>First Name</label>
        <input
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      
                      
                      type="firstName"
                      placeholder="enter first Name"
                    />
        </div>

        <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
        
        <label htmlFor="lastName" className="px-2">Last Name</label>
        <input
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                      className='px-2'
                      
                      type="lastName"
                      placeholder="enter last name"
                    />

        </div>


        

        
        

        <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
        
        <label htmlFor="lastName" className="px-2">Email</label>
        <input
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      className='px-2'
                      
                      type="email"
                      placeholder="enter Email"
                    />

        </div>

        <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
        
        <label htmlFor="lastName" className="px-2">Password</label>
        <input
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      className='px-2'
                      
                      type="password"
                      placeholder="enter password"
                    />

        </div>
        <button type="submit" className='p-4 px-10'>Submit</button>
        </div>

    </form>

    <button color="primary" className="px-4"
            onClick={routeChange}
              >
              Login
            </button>
    </>
  )
}



export default Register1