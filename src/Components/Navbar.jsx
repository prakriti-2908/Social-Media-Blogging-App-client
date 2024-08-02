import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleLogoutFromAllDevices = async () => {
    try {
      await axios.post('/auth/logout_from_all_devices', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.log("Error logging out from all devices: ", error);
    }
  };

  const handleDltAccnt = async () => {
    try {
      await axios.post('/user/delete-user');
      navigate('/');
    } catch (error) {
     console.log("Error : ",error); 
    }
    alert('hehe deleted');

  }

  const confirmDltAccnt = () => {
    if(window.confirm("Do you want to delete your account ? ")){
      handleDltAccnt();
    }
  }

  const confirmLogout = () => {
    if(window.confirm("Logout account from this device ? ")){
      handleLogout();
    }
  }

  const confirmLogoutAllDevices = () => {
    if(window.confirm("Logout account from all devices ? ")){
      handleLogoutFromAllDevices();
    }
  }


  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">UrSoulVoice</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/create-blogs">Create Voice</Link></li>
        <li><Link to="/trash">Trash</Link></li>
        <li><button onClick={confirmLogout}>Logout</button></li>
        <li><button onClick={confirmLogoutAllDevices}>Logout from All Devices</button></li>
        <li><button onClick={confirmDltAccnt} style={{color:"red"}}>Delete Account</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
