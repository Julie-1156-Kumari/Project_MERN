// import axios from 'axios';
import { axiosInstance } from "./index";


// Function to register a new user
export const RegisterUser = async ( payload ) => {
    try {
        const response = await axiosInstance.post("/api/users/register", payload);
        return response.data;
    } catch (error) {
        // console.error("Error registering user:", error);
        return error; 
    }
};  

// Function to login a registered user
export const LoginUser = async ( payload ) => {
    try {
        const response = await axiosInstance.post("/api/users/login", payload); 
        return response.data;
    } catch (error) {
        // console.error("Error logging in user:", error);
        return error;
    }
};


// Function to Get the current user details
export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/users/get-current-user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        // console.log("Current user details:", response.data);
        return response.data; 
    } catch (error) {
        return error;
    }
};

// Forgot Password
export const ForgetPassword = async (value) => {
  try {
    const response = await axiosInstance.patch(
      "api/users/forgotpassword",
      value
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Reset Password
export const ResetPassword = async (value) => {
  try {
    const response = await axiosInstance.patch(
      "api/users/resetpassword",
      value
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
