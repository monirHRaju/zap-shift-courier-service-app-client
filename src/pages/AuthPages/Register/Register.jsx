import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import authImage from "../../../assets/authImage.png";
import { Link, useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Register = () => {
  const { googleSignIn, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  const { registerUser } = useAuth();

  const handleRegister = (data) => {
    console.log("after register", data.photo[0]);
    const profileImg = data.photo[0]
    
    registerUser(data.email, data.password)
      .then((result) => {
        console.log("after register", result);
        //store the image ang get the photo url
        // prepare the data for upload
        const formData = new FormData()
        formData.append('image', profileImg)

        // upload image
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_UPLOAD_API}`
        
        axios.post(image_API_URL, formData)
        .then( res => {
          console.log('after image upload', res.data.data.url)
          //update profile with image url
          const userProfile = {
            //get name from input data
            displayName : data.name,
            //get photo url from image upload response data
            photoURL : res.data.data.url
          }

          updateUserProfile(userProfile)
          .then(() => console.log('after updating profile done' ))
          .catch(e => console.log('updating profile error', e ))



          // navigate( location?.state || '/')
        setTimeout(() => {
          toast.success('Success! You are logged in.')
        }, 1000)

        })
        .catch(e => {
          console.log('no img upload error', e)
        })



        
      })
      .catch((error) => {
        console.log('registration failed:', error);
      });
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
    <div className="flex items-center p-5 lg:p-0 justify-between my-18">
      <div className="flex-1 bg-white rounded-lg p-5">
        <div>
          <form onSubmit={handleSubmit(handleRegister)} >
            <fieldset className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}
              
              {/* photo */}
              <label className="label">Name</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input"
                placeholder="photo"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
              
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}

              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">Password at least 6 digit</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must contain at least one uppercase letter, one
                  lowercase letter, one number, and one special character.
                </p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn mt-4">Register</button>
            </fieldset>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-secondary w-full btn-outline"
          >
            <FcGoogle size={30} />
            Login with Google
          </button>
          <p className="my-6">Or</p>
          <p>Already have account? <Link to={'/login'} className="link link-hover">Login</Link></p>
        </div>
      </div>
      <div className="flex-1 bg-accent">
        <img src={authImage} alt="" />
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default Register;
