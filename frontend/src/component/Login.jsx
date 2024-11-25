import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginSignup.css";
import api from "../data/api";
import { setToken } from "../redux/authSlice";
// import login from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Submitting login form:", data);
    try {
      const response = await api.post("/login", {
        email: data.email,
        password: data.password,
        role: data.role,
      });
      // document.cookie = `jwtToken=${response.data.token}; Path=/; HttpOnly`;

      console.log(response);
      if (response.status === 200) {
        const token = response.data.token;
        const user = response.data.user;
        //

        // Dispatch the setToken action to store the token in Redux and decode it
        dispatch(setToken(token));

        // Optionally store the token in localStorage
        // Optionally set the token in localStorage (can be managed in Redux)
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));

        // Reset form fields
        reset();

        // Redirect to another page (e.g., dashboard)
        navigate("/");
      } else if (response.status === 403) {
        // Handle the role mismatch scenario
        if (response.data.error.includes("admin")) {
          alert("You are an admin. Please log in using the admin option.");
        } else {
          alert(
            "You are not an admin. Please log in using the non-admin option."
          );
        }
      } else {
        // Handle other error cases
        alert(
          response.data.error ||
            "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Optionally, handle error (show error message, etc.)
      alert(
        error.response?.data?.error ||
          "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517707711963-adf9078bdf01?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div>
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
              <div className="relative bg-white bg-opacity-10 p-8 rounded-2xl shadow-xl backdrop-filter backdrop-blur-lg border border-opacity-30 border-white w-full sm:w-96 md:w-[450px] lg:w-[550px] h-auto sm:h-96 md:h-112 lg:h-[600px]">
                <div className="absolute inset-0 bg-white opacity-10 rounded-2xl filter blur-xl"></div>
                <div className="relative z-10">
                  <h2 className="font-bold mb-6 text-center text-slate-700 drop-shadow-md mt-4 xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl">
                    Login Form
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block xl:text-2xl lg:text-2xl md:text-xl text-blue-950 font-semibold mb-2 mt-10"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Email is invalid",
                          },
                        })}
                        className="w-full text-black text-xl px-4 py-3 lg:w-full sm:w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-opacity-70"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-red-300 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block xl:text-2xl lg:text-2xl md:text-xl text-blue-950 font-semibold mb-2 mt-10"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                        })}
                        className="w-full text-black text-xl px-4 py-3 lg:w-full sm:w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-opacity-70"
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <p className="text-red-300 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="role"
                        className="block xl:text-2xl lg:text-2xl md:text-xl text-blue-950 font-semibold mb-2 mt-10"
                      >
                        Role
                      </label>
                      <select
                        id="role"
                        {...register("role", { required: "Role is required" })}
                        className="w-full text-black text-xl px-4 py-3 lg:w-full sm:w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select role</option>
                        <option value="admin">Admin</option>
                        <option value="user">Not Admin</option>
                      </select>
                      {errors.role && (
                        <p className="text-red-300 text-sm mt-1">
                          {errors.role.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-36 text-2xl items-center bg-purple-400 text-blue-950 font-semibold py-6 px-6 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2
                                             focus:ring-purple-500 focus:ring-opacity-50 transform transition duration-200 
                                             hover:scale-105 shadow-md lg:mt-[35px] lg:ml-[185px] md:mt-[35px] md:ml-[135px] xs:mt-[35px] xs:ml-[95px] sm:w-28 xs:w-24 xs:py-4 xs:text-lg"
                    >
                      Login
                    </button>
                  </form>
                  <div className="flex justify-center">
                    <Link
                      to="/forgot-password"
                      className="text-xl font-bold text-center cursor-pointer hover:text-purple-800"
                      style={{ marginTop: "35px" }}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
