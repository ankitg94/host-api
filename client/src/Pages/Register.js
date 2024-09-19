import React, { useState } from 'react';
import './Form.css';
import { register } from '../Api/AllApi';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
const navigate =useNavigate() 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
   const reposnse =await register(formData)
    if(reposnse){
     toast.success("user Register successfully")
    navigate("/login")
  }
}
   catch(error){
    const errorMessage = 
    error.response && error.response.data && error.response.data.message ? error.response.data.message
    : "An error occurred. Please try again.";
   
  toast.error(errorMessage, { autoClose: 600 });

    
 }   
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Register Form</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">Register</button>
        <p className="redirect-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
        
      </form>
    </div>
  );
};

export default Register;
