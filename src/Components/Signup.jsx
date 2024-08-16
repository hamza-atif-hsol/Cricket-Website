import React,{useState,useEffect} from 'react';
import pcb from "../images/pcb.png";
import squad1 from "../images/squad1.jpg";
import {Link,useNavigate} from "react-router-dom"
import axios from "axios";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
    let navigate=useNavigate();
    const [firstName,setfirstname]=useState("");
    const [lastName,setlastname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");

    useEffect(() => {
        if (localStorage.getItem("admin-info")) {
          console.log("localStorage", localStorage);
          setTimeout(()=>{
            toast.success("Registration Successfull");
            setTimeout(() => {
              navigate('/');
            }, 2000);
          });
        }
      }, [handleRegister]);

      async function handleRegister(event) {
        console.log("handle register clicked");
        event.preventDefault();
        let item = { firstName,lastName,email, password };
        console.log(firstName,lastName,email, password);
        try {
          let result = await axios.post("http://100.80.80.84:3000/Register", item);
          console.log("result", result.data);
          localStorage.setItem("admin-info", JSON.stringify(result.data));
          console.log("localStorage", localStorage);
          navigate();
        } catch (error) {
          toast.error("Registration Failed!!")
          console.error("Error during login", error);
        }
      }
  return (
    <div className="login-main-container"
    style={{ backgroundImage: `url(${squad1})` }}
  >
    <div className="signup-sub-container-1">
      <div className="login-sub-container-2">
          <h2>Welcome to PCB SignUp Page <img className="login-logo" src={pcb} alt="" srcset="" /></h2>
        <form action="">
        <label htmlFor="firstname">First Name</label>
          <br />
          <input className="input-bar" type="text" name="firstname" id="firstname" onChange={(e)=>{
            setfirstname(e.target.value)
          }} />
          <br />
          <label htmlFor="lastname">Last Name</label>
          <br />
          <input className="input-bar" type="text" name="lastname" id="lastname" onChange={(e)=>{
            setlastname(e.target.value)
          }} />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input className="input-bar" type="text" name="email" id="email" onChange={(e)=>{
            setemail(e.target.value)
          }} />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input className="input-bar" type="password" name="password" id="password" onChange={(e)=>{
            setpassword(e.target.value)
          }} />
          <br />
          <input type="checkbox" name="terms" id="terms" />   I agree to the{" "}
          <a href="">Terms & Policy</a>
          <br />
          <button onClick={handleRegister} className="login-btn" type="submit">Sign Up</button>
          <br />
        </form>
        <hr className="hr-statement" />
            <Link to="/" className="signup-statement" type="submit">Already Have a Account? Sign In</Link>
         
      </div>
    </div>
      <ToastContainer/>
    </div>
  )
}

export default Signup
