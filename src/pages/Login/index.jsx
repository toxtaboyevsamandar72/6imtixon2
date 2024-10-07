import React, { useState, useRef } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import http from "../../axio"; 
import "./index.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false); 
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const formRef = useRef();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  function handleLogin(event) {
    event.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

   
    if (!email) {
      alert("Email is required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!password) {
      alert("Password is required.");
      return;
    }

    
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const userLogin = { email, password };

    http.post("/login", userLogin, {
      headers: {
        'Content-Type': 'application/json'
      }
    }) 
      .then((res) => res.data) 
      .then((data) => {
        if (data.message === "Invalid Password!" || data.message === "User Not found.") {
          alert(data.message);
        } 
        if (data.accessToken) {
          navigate('/'); 
          formRef.current.reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="register_container">
      <form ref={formRef} className="form_register" onSubmit={handleLogin}>
        <h2>Nice to see you again</h2>
        <input
          ref={emailRef}
          className="input_regis"
          type="email"
          placeholder="Enter email..."
        />
        
        <div className="input-wrapper">
          <input
            ref={passwordRef}
            className="input_regis"
            type={showPassword ? "text" : "password"} 
            placeholder="Enter password..."
          />
          <span className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />} 
          </span>
        </div>

        <button type="submit" className="button_reg">Login</button>
        <button className="button_regis">
          Don't have an account? 
          <Link className="Lin" to="/register">Register</Link>
        </button>
      </form>
    </div>
  );
}

export default Login;
