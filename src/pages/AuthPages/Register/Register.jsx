import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import authImage from '../../../assets/authImage.png'

const Register = () => {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const {registerUser} = useAuth()
    const handleRegister = (data) => {
      console.log('after register', data)
      registerUser(data.email, data.password)
      .then(result => {
        console.log('after register', result)
      })
      .catch(error => {
        console.log(error)
      })
    }
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" />
          {errors.email?.type === 'required' && <p className="text-red-500">Email is required</p> }
          
          <label className="label">Password</label>
          <input type="password" {...register('password', {required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/ })} className="input" placeholder="Password" />
            {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p> }
            {errors.password?.type === 'minLength' && <p className="text-red-500">Password at least 6 digit</p> }
            {errors.password?.type === 'pattern' && <p className="text-red-500">Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.</p>}
            
          
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
