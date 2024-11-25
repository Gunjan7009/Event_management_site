import React from "react";
import { useNavigate } from "react-router-dom";

const AuthSelection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center items-center min-h-screen  bg-cover bg-center bg-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 xl:gap-10 lg:gap-8 md:gap-6 sm:gap-4 xs:gap-3 gap-2 w-full max-w-4xl bg-gray-200">
          <div className="flex items-center justify-center md:mt-0 xs:mt-[-80px] ">
            <div className="relative bg-white p-8 rounded-2xl shadow-xl border lg:h-96 md:h-80 lg:w-max md:w-80 xs:w-64 xs:h-72 lg:mb-0 md:mb-0 sm:mb-36 xs:mb-32">
              <div className="absolute bg-white rounded-2xl filter"></div>
              <div className="relative z-10">
                <h2 className="lg:text-4xl font-bold mb-6 text-center text-red-600 drop-shadow-md md:text-2xl">
                  Already a registered user?
                </h2>
                <p className="text-teal-900 text-center lg:mb-8 lg:text-2xl mt-5 md:text-lg">
                  If you already have an account, click the button below to log
                  in.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-red-600 lg:text-xl md:text-lg text-white font-semibold mt-4 py-3 px-6 rounded-full hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform transition duration-200 hover:scale-105 shadow-md"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center md:mt-0 xs:mt-[-80px] ">
            <div className="relative bg-white p-8 rounded-2xl shadow-xl border lg:h-96 md:h-80 lg:w-max md:w-80 xs:w-64 xs:h-72 lg:mb-0 md:mb-0 xs:mb-10">
              <div className="absolute bg-white rounded-2xl filter"></div>
              <div className="relative z-10">
                <h2 className="font-bold mb-6 text-center xl:text-[34px] lg:text-4xl md:text-2xl text-slate-700 drop-shadow-md">
                  New to our platform?
                </h2>
                <p className="text-teal-900 text-center lg:mb-8 lg:text-2xl lg:mt-20 md:mt-16 sm:mt-14 xs:mt-14 md:text-lg">
                  If you don't have an account yet, click the button below to
                  sign up.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-red-600 lg:text-xl md:text-lg text-white font-semibold mt-4 py-3 px-6 rounded-full hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform transition duration-200 hover:scale-105 shadow-md"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthSelection;
