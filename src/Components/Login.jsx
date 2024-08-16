import React, { useState, useEffect } from "react";
import pcb from "../images/pcb.png";
import image from "../images/image.jpg";
import google from "../images/google.png";
import apple from "../images/apple.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      setTimeout(() => {
        toast.success("Login Successfull");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      });
    }
  }, [handleLogin]);

  async function handleLogin(event) {
    event.preventDefault();
    let item = { email, password };
    console.log(email, password);

    try {
      let result = await axios.post("http://100.80.80.84:3000/login ", item);
      console.log("result", result.data);
      localStorage.setItem("user-info", JSON.stringify(result.data));
      console.log("localStorage1", localStorage);
      navigate();
    } catch (error) {
      toast.error("Login Failed!!");
      console.error("Error during login", error);
    }
  }
  return (
    <div
      className="login-main-container"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="login-sub-container-1">
        <div className="login-sub-container-2">
          <h2>
            Welcome to PCB Login Page{" "}
            <img className="login-logo" src={pcb} alt="" srcset="" />
          </h2>
          <form action="">
            <label htmlFor="email">Email</label>
            <br />
            <input
              className="input-bar"
              type="text"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              className="input-bar"
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />

            <button onClick={handleLogin} className="login-btn" type="submit">
              Login
            </button>

            <br />
          </form>
          <button className="login-btn-google" type="button">
            <img className="login-logo-google" src={google} alt="" /> Sign in
            with Google
          </button>
          <button className="login-btn-google" type="button">
            <img className="login-logo-apple" src={apple} alt="" /> Sign in with
            Apple
          </button>
          <hr className="hr-statement" />
          <Link to="/signup" className="signup-statement" type="submit">
            Don't Have a Account? Sign Up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
