import CommonForm from '@/components/common/CommonForm.jsx'
import { registerFormControls } from '@/config/index.js';
import React, { useState } from 'react'
import toast, { useToaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {

  const [formData, setFormData] = useState(initialState);
  // console.log(formData)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

   const onSubmit=()=>{

   }

  // console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">

          Create new account
        </h1>
        <p className="mt-2">

          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Register