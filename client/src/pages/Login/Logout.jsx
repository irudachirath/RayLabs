import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn, setLoggedOut } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import ModalTemplete from "../../components/Modals/ModalTemplete";

const Logout = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modelClose, setModelClose] = useState(false);

  // Check cookie on component mount and update state accordingly
  useEffect(() => {
    const checkLoginStatus = () => {
      const username = document.cookie
        .split("; ")
        .find((row) => row.startsWith("username="));

      if (username) {
        dispatch(setLoggedIn(true)); // Update the state if the user is logged in
      } else {
        dispatch(setLoggedOut()); // Update the state if no cookie is found
      }
    };

    checkLoginStatus(); // Call the function to update the state immediately when the component mounts

    // You might want to run the check every time the component mounts, in case the cookie is set dynamically
  }, [dispatch]);

  const handleLogout = () => {
    document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"; // Clear cookie
    // clear access token and picture as well
    document.cookie = "accessToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "picture= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    dispatch(setLoggedOut()); // Update the state immediately
    setModelClose(true);
    navigate("/"); // Redirect to home page
  };

  return (
    <>
      <ModalTemplete
        close={modelClose}
        text={"Logout"}
        content={
          <div className="p-5 text-white">
            <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
            <p className="text-base">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Logout;
