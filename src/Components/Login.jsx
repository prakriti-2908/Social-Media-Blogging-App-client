import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/Login.css'; // Make sure to create this CSS file
import axios from 'axios';

const Login = () => {

    const[formData,setFormData] = useState({
        loginID:"",
        password:"",
    });

    const[error,setError] = useState("");

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login',formData);
            //console.log(response.data.status!==200);
            if(response.data.status!==200){
                setError(`${response.data.message}`);
            }else{
                navigate('/home');
            }
        } catch (error) {
            setError(`Some error has occures, ${error}`)
        }
    }


  return (
    <div className="container">
      <img src="../public/bloggingApp.jpg" alt="Decorative" className="image" />
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username or Email Address</label>
            <input onChange={handleChange} type="text" id="username" name="loginId" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="btn">Login</button>
          {error&&<p className='error'>{error}</p>}
          <p>Don't have an account? <Link to="/" className="link">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
