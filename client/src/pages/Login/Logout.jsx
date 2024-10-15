import React, { useState } from "react";
// import { GoogleLogout } from "react-google-login";

const Logout = ({ setIsLoggedIn }) => {
  const clientId =
    "317549661140-kur4aa93oi628jqfo91qrgqkm5rtjcsr.apps.googleusercontent.com";
  const onLogoutSuccess = () => {
    console.log("Logged out successfully");
    setIsLoggedIn(false);
  };

  const handleCancel = () => {
    setShowLogoutWarning(false);
    setIsLoggedIn(true);
  };

  return (
    <div className="p-5 text-white">
      <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
      <p className="text-base">Are you sure you want to logout?</p>
      <div className="flex justify-end space-x-4 mt-4">
        {/* <GoogleLogout
          clientId={clientId}
          onLogoutSuccess={onLogoutSuccess}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        /> */}
      </div>
    </div>
  );
};

export default Logout;
