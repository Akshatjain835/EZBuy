import React from 'react'
import { useState } from 'react';
import CommonForm from '@/components/common/CommonForm.jsx'
import { loginFormControls } from '@/config/index.js';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/authslice/authSlice.js';
import { useToast } from '@/hooks/use-toast'

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const {toast}=useToast();

  const onSubmit=(e)=>{
    e.preventDefault();

    dispatch(loginUser(formData)).then((data) => {

      if (data?.payload?.success) {

        toast({
          title: data?.payload?.message,
          variant:"success",
        });

      } else {

        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });

      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Sign in to your account
      </h1>
      <p className="mt-2">
        Don't have an account
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </p>
    </div>

    <CommonForm
      formControls={loginFormControls}
      buttonText={"Sign In"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
  </div>
  )
}

export default Login