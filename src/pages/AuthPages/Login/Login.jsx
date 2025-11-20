import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import authImage from '../../../assets/authImage.png'
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  
  const { signInUser, googleSignIn } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate()
  const location = useLocation()
  console.log('in the login page', location)

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log("after login", result);
        //redirect to desired location or homepage
        navigate( location?.state || '/')

        setTimeout(() => {
          toast.success('Success! You are logged in.')
        }, 1000)
      })

      .catch((error) => console.log(error));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then((result) => {
        console.log("after login", result);
        navigate( location?.state || '/')

        setTimeout(() => {
          toast.success('Success! You are logged in.')
        }, 1000)
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="md:flex items-center justify-between my-18 h-vh">
      <div className="md:flex-1 p-5 bg-white rounded-lg">
        <div className="">
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">email is required</p>
              )}
              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 character or longer
                </p>
              )}
              <div>
                <Link to={'/forget-password'} className="link link-hover">Forgot password?</Link>
              </div>
              <button className="btn w-fit mt-4">Login</button>
            </fieldset>
          </form>
          <button onClick={handleGoogleSignIn} className="btn btn-secondary btn-outline"><FcGoogle size={30} />Login with Google</button>
        </div>
          <p className="my-6">Or</p>
          <p>Don't have account? <Link to={'/register'} state={location.state} className="link link-hover text-secondary">Register</Link></p>
      </div>
      <div className="md:flex-1 bg-accent">
        <img src={authImage} alt="" />
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default Login;
