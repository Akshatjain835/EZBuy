import CommonForm from '@/components/common/CommonForm.jsx'
import { registerFormControls } from '@/config/index.js';
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/redux/authslice/authSlice.js';
import React, { useState } from 'react'
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
  const { toast } = useToast();
  

  const onSubmit = (e) => {

    e.preventDefault();

    dispatch(registerUser(formData)).then((data) => {

      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });

        navigate("/auth/login");

      } else {

        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });

      }
    });
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