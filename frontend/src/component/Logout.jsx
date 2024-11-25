import { useEffect } from "react";
import authServices from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Perform the logout
    authServices.logout()
      .then(response => {
        alert(response.data.message);
        localStorage.removeItem('token');  // Clear token from local storage
        dispatch(logout());  // Clear token from Redux store

        // Redirect to the login page
        setTimeout(() => {
          navigate('/login');
        }, 500);
      })
      .catch(error => {
        alert('Error logging out');
        navigate('/login');
      });
  }, [navigate, dispatch]);

  return (
    <div>Logging out...</div>
  );
};

export default Logout;
