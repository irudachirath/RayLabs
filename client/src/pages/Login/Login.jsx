import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import sampleImage from "../../assets/bg.jpg";
import logo from "../../assets/react.svg";

const Login = () => {

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    // Add your logic to handle the successful login, such as sending the credential to your backend server.
  };

  const handleGoogleLoginError = () => {
    console.log('Google Login Failed');
    // Add your logic to handle errors.
  };


  return (

    <GoogleOAuthProvider clientId="464451769770-i0cq4c8vseocn67hc63gu09dlv2i0t91.apps.googleusercontent.com">
      <section 
        className="min-h-screen flex items-center justify-center bg-violet-900"
        style={{ backgroundColor: 'rgb(47, 35, 45)', backgroundImage: `url(${sampleImage})` }}> 

        <div className="flex w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${sampleImage})` }}></div>
          <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">
              <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
              RAYLABS
            </a>
            <div className="w-full">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                Nice to see you again
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-black"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-2xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-2xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-64 text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <div className="flex justify-center mt-4">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  useOneTap
                  className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-medium rounded-2xl text-sm px-5 py-2.5 text-center mt-2"
                />
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up now
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <button className="absolute top-4 right-4 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          Register as a User
        </button>
      </section>
    </GoogleOAuthProvider>
  );
}

export default Login;