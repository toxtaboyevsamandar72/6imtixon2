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

    if (!email || !password || password.length < 6) {
      alert("Please provide valid credentials");
      return;
    }

    const userLogin = { email, password };

    http
      .post("/login", userLogin, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          navigate("/");  // Redirect to Home page
          formRef.current.reset();
        } else {
          alert("Login failed, please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while logging in.");
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
          autoComplete="email"
        />
        <div className="input-wrapper">
          <input
            ref={passwordRef}
            className="input_regis"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password..."
            autoComplete="current-password"
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
