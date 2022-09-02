import React from "react";
import { useFormik } from "formik";
import { Redirect , useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import poster from "../../../img/poster.png";
import {  registerUserAction , loginUserAction} from "../../../redux/slices/users/UserSlice";

const formSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    //formik
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: values => {
        //dispath the action
        dispatch(loginUserAction(values));
      },
      validationSchema: formSchema,
    });

const store = useSelector(state => state?.users);
  const { registered, loading, serverErr, appErr } = store;
  console.log(store.registered)
  if (registered) return <Redirect to="/" />
  return(
    <>
        <form onSubmit={formik.handleSubmit}>
        <h3>Login</h3>

        <div className="">
        
        
        

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
            onClick={()=>{history.push("/register")}}
              >
              Register
            </button>
    </>
  )
  }

  export default Login;