import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    //intercept user request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(config => {
          
          config.headers.Authorization = `Bearer ${user?.accessToken}` 
          return config;
    })

    //interceptor for response
    const resInterceptor = axiosSecure.interceptors.response.use(response => {

      return response
    }, (error) => {
      console.log(error)

      //get status from backend response when hit the secured url
      const statusCode = error.status;
      // if response status code 401, 403 then logout (means if anyone try to
      // access data of other or hidden then he/she will be logged out)
      if(statusCode === 401 || statusCode === 403){
        logOut()
        .then(() => {
          navigate('/login')
        })
      }


      return Promise.reject(error)
    })

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    }

    


  }, [user, logOut, navigate]);
  
  return axiosSecure;
};

export default useAxiosSecure;
