import React from "react";
import { logo, googleLogo } from "../../utils";
// import GoogleLogin, { googleLogin } from "react-google-login";

const Login = ({ setIsLoggedIn }) => {
  const clientId =
    "317549661140-kur4aa93oi628jqfo91qrgqkm5rtjcsr.apps.googleusercontent.com";

  const onSuccess = (response) => {
    console.log(response);
    setIsLoggedIn(true);
  };
  const onFailure = (response) => {
    console.log(response);
    setIsLoggedIn(false);
  };

  return (
    <div className="p-8">
      <div className="space-y-4">
        <img src={logo} loading="lazy" className="w-40" />
        <h2 className="mb-8 text-3xl text-white font-bold">
          Log in to unlock the <br />
          best of RayLabs.
        </h2>
      </div>
      <div className="mt-14 grid space-y-4">
        {/* <GoogleLogin
          clientId={clientId}
          render={(renderProps) => (
            <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-[#8F3E97]">
              <div className="relative flex items-center space-x-4 justify-center">
                <img
                  src={googleLogo}
                  className="absolute left-0 w-5"
                  alt="google logo"
                />
                <span className="block w-max font-semibold tracking-wide text-white text-sm transition duration-300 sm:text-base">
                  Continue with Google
                </span>
              </div>
            </button>
          )}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        /> */}

        <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 group-hover:text-purple-400 focus:bg-purple-50 active:bg-purple-100">
          <div className="relative flex items-center space-x-4 justify-center">
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 w-5"
            >
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M16.52 12.46C16.508 11.8438 16.6682 11.2365 16.9827 10.7065C17.2972 10.1765 17.7534 9.74476 18.3 9.46C17.9558 8.98143 17.5063 8.5883 16.9862 8.31089C16.466 8.03349 15.8892 7.87923 15.3 7.86C14.03 7.76 12.65 8.6 12.14 8.6C11.63 8.6 10.37 7.9 9.40999 7.9C7.40999 7.9 5.29999 9.49 5.29999 12.66C5.30963 13.6481 5.48194 14.6279 5.80999 15.56C6.24999 16.84 7.89999 20.05 9.61999 20C10.52 20 11.16 19.36 12.33 19.36C13.5 19.36 14.05 20 15.06 20C16.79 20 18.29 17.05 18.72 15.74C18.0689 15.4737 17.5119 15.0195 17.1201 14.4353C16.7282 13.8511 16.5193 13.1634 16.52 12.46ZM14.52 6.59C14.8307 6.23965 15.065 5.82839 15.2079 5.38245C15.3508 4.93651 15.3992 4.46569 15.35 4C14.4163 4.10239 13.5539 4.54785 12.93 5.25C12.6074 5.58991 12.3583 5.99266 12.1983 6.43312C12.0383 6.87358 11.9708 7.34229 12 7.81C12.4842 7.82361 12.9646 7.71974 13.3999 7.50728C13.8353 7.29482 14.2127 6.98009 14.5 6.59H14.52Z"
                  fill="#ffffff"
                ></path>{" "}
              </g>
            </svg>
            <span className="block w-max font-semibold tracking-widetext-sm transition text-white duration-300 sm:text-base">
              Continue with Apple
            </span>
          </div>
        </button>
      </div>
      <div className="mt-14 space-y-4 py-3 text-gray-100 text-center">
        <p className="text-xs">
          By proceeding, you agree to our
          <a href="/privacy-policy/" className="underline">
            {" "}
            Terms of Use{" "}
          </a>
          and confirm you have read our{" "}
          <a href="/privacy-policy/" className="underline">
            Privacy and Cookie Statement
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
