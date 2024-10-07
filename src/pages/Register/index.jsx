import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../axio";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";

function Register() {
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault(); 
    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      age: parseInt(ageRef.current.value, 10),
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    if (user.password !== user.confirmPassword) {
      alert("Parollar mos kelmayapti!");
      return;
    }

    http.post("/register", user)
      .then((res) => {
        if (res.status >= 200 && res.status <= 300) {
          alert("Registratsiya muvaffaqiyatli tugadi");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <form className="formReg">
        <input
          className="reginput"
          ref={firstNameRef}
          type="text"
          placeholder="Enter first name..."
        />
        <input
          className="reginput"
          ref={lastNameRef}
          type="text"
          placeholder="Enter last name..."
        />
        <input
          className="reginput"
          ref={ageRef}
          type="number"
          placeholder="Enter age..."
        />
        <input
          className="reginput"
          ref={emailRef}
          type="email"
          placeholder="Enter email..."
        />

        <div className="input-wrapper">
          <input
            className="reginput"
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password..."
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="input-wrapper">
          <input
            className="reginput"
            ref={confirmPasswordRef}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter confirm password..."
          />
          <span
            className="eye-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="btnReg" onClick={handleRegister}>
          Register
        </button>
        
        <Link to="/login">
          <button className="btnLogin">
            Login
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Register;
