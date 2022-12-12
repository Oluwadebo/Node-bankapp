import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as yup from "yup";
import { useFormik } from "formik";
import axios from 'axios';
import { baseUrl } from "./endpoint";
import svgexport30 from './assets/pic/svgexport-30.png'
import svgexport31 from './assets/pic/svgexport-31.png'
import opalogo from './assets/pic/logo-light.png'
import download from './assets/pic/download.png'
import svgexport1 from './assets/pic/svgexport-1.png'

const AboutDe = () => {
  const [Error, setError] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.member) {
      let detail = JSON.parse(localStorage.member)
      setallUser(detail)
    } else {
      setallUser([])
    }
  }, [])

  let date = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let time = new Date().toLocaleTimeString();
  let DateCreated = `${date}-${month}-${year}  ${time}`
  let accountNumber = '00' + Math.floor(Math.random() * 100000000)

  // const signup = () => {
  //   if (firstname !== "" && number !== "" && email !== "" && password !== "") {
  //     let accountBalance = Math.floor(Math.random() * 10000)
  //     let User = { firstname, Lastname, email, number, password, accountNumber, DateCreated, history, accountBalance }
  //     setallUser(() => {
  //       let Customer = [...allUser, User]
  //       localStorage.member = JSON.stringify(Customer)
  //       navigate('/SignIn')
  //       return Customer
  //     })
  //   } else {
  //     let err = "Please fill all your input outlet"
  //     setError(err)
  //   }
  // }
  let myStyle = {
    fontSize: '20px',
  }
  let mySpa = {
    color: '#1FC69D'
  }
  const signup = useFormik({
    initialValues: {
      Name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setloader(prev => true)
      axios.post(`${baseUrl}customersignup`, values).then((credentials) => {
        if (credentials) {
          let Err = credentials.data.message;
          if (Err == "Email already used") {
            setloader(prev => false)
            setError("Email already used");
          } else {
            setloader(prev => false)
            setfirst(prev => true)
          }
        }
      })
    },
    validationSchema: yup.object({
      Name: yup
        .string()
        .required("This field is required")
        .min(3, "must be greater than three"),
      email: yup
        .string()
        .required("This field is required")
        .email("must be a valid email"),
      password: yup
        .string()
        .required("This field is required")
        .matches(lower, "Must include lowerCase letter")
        .matches(upper, "Must include upperCase letter")
        .matches(number, "Must include a number")
        .min(5, "must be greater than 5 charaters"),
    }),
  });
  const toggle = useRef();
  const i = useRef();
  const password = useRef();

  const showHide = () => {
    if (password.current.type === "password") {
      password.current.setAttribute("type", "text");
      toggle.current.classList.add("hide");
      i.current.classList = "fa fa-eye-slash";
    } else {
      password.current.setAttribute("type", "password");
      i.current.classList = "fa fa-eye";
      toggle.current.classList.remove("hide");
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light fixed-top shadow">
        <div className="container">
          <img src={svgexport1} alt="" className='img-fluid' />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="nav-item px-3">
                <Link to="/" className="nav-link text-dark" aria-current="page" style={myStyle}>Mini POS</Link>
              </li>
              <li className="nav-item px-3">
                <Link to="/" className="nav-link text-dark" style={myStyle}>Merchants</Link>
              </li>
              <li className="nav-item px-3">
                <Link to="/" className="nav-link text-dark" style={myStyle}>Documentation</Link>
              </li>
              <li className="nav-item px-3 dropdown">
                <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={myStyle}>Company</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item py-2 px-4" href="#">About Us</a></li>
                  <li><a className="dropdown-item py-2 px-4" href="#">Blog</a></li>
                  <li><a className="dropdown-item py-2 px-4" href="#">Contact Us</a></li>
                  <li><a className="dropdown-item py-2 px-4" href="#">Press & Media</a></li>
                </ul>
              </li>
              <li className="nav-item px-3 dropdown">
                <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={myStyle}>Join Us</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item py-2 px-4" href="#">Graduates</a></li>
                  <li><a className="dropdown-item py-2 px-4" href="#">Experienced</a></li>
                </ul>
              </li>
            </ul>
            <span className="navbar-text">
              <Link to="/SignIn"><button className='btn form-control' style={{ background: '#1FC69D', border: 'none' }}>Sign-In</button></Link>
            </span>
          </div>
        </div>
      </nav>
      <div className="mt-5">
        <div className="container">
          <div className="row pt-md-5 pt-4">
            <p><b className='text-danger'>{Error}</b></p>
            <div className="col-12 col-md-6 rig">
              <img src={opalogo} alt="" className='img-fluid mx-auto mt-5' />
              <h5><b>Create an account for your business.</b></h5>
              <div className='form-floating'>
                <input type="text" placeholder='Your firstname' className='form-control' onChange={(e) => setfirstname(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                <label>&#x1F464;&nbsp; Your firstname</label>
              </div>
              <div className='form-floating mt-2'>
                <input type="text" placeholder='Your Lastname' className='form-control' onChange={(e) => setLastname(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                <label>&#x1F464;&nbsp; Your Lastname</label>
              </div>
              <div className='form-floating mt-2'>
                <input type="email" placeholder='Your email' className='form-control' onChange={(e) => setemail(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                <label>&#x1F4E7;&nbsp; Your email</label>
              </div>
              <div className='form-floating mt-2'>
                <input type="number" placeholder='Your phone number' className='form-control' onChange={(e) => setnumber(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                <label>&#x1F4DE;&nbsp; Your phone number</label>
              </div>
              <div className='form-floating mt-2'>
                <input type="password" placeholder='Your password' maxLength={10} className='form-control' onChange={(e) => setpassword(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                <label>&#x1F512;&nbsp; Your password</label>
                <button onClick={signup} className='btn form-control py-3 mt-3' style={{ background: '#1FC69D', border: 'none' }}>Create account</button>
              </div>
              <div className='row mt-2'>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-8">
                      <p style={{ opacity: '0.6' }}>Do have an account?</p>
                    </div>
                    <div className="col-4">
                      <p><b><Link to="/SignIn" className='sig'>Sign In</Link></b></p>
                    </div>
                  </div>
                </div>
              </div>
              <form action="" onSubmit={signup.handleSubmit}>
                <div className="form-floating my-3">
                  <input type="text" placeholder="Your Name" className={signup.errors.Name && signup.touched.Name ? "form-control is-invalid" : "form-control"} onChange={signup.handleChange} style={{ backgroundColor: "#F5F7FA" }} name="Name" onBlur={signup.handleBlur} />
                  {signup.touched.Name && (
                    <div style={{ color: "red" }} className="my-2">
                      {signup.errors.Name}
                    </div>
                  )}
                  <label>&#x1F464;&nbsp; Your Name</label>
                </div>
                <div className="form-floating my-3">
                  <input type="email" placeholder="Your email" className={signup.errors.email && signup.touched.email ? "form-control is-invalid" : "form-control"} onChange={signup.handleChange} style={{ backgroundColor: "#F5F7FA" }} name="email" onBlur={signup.handleBlur} />
                  {signup.touched.email && (
                    <div style={{ color: "red" }} className="my-2">
                      {signup.errors.email}
                    </div>
                  )}
                  <label>&#x1F4E7;&nbsp; Your email</label>
                </div>
                <div className="form-floating my-3">
                  <input
                    type="password"
                    placeholder="Your password"
                    className={
                      signup.errors.password && signup.touched.password
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    ref={password}
                    maxLength={10}
                    onChange={signup.handleChange}
                    style={{ backgroundColor: "#F5F7FA" }}
                    name="password"
                    onBlur={signup.handleBlur}
                  />

                  <div
                    id="toggle"
                    ref={toggle}
                    onClick={showHide}
                    className="gose pe-4"
                  >
                    <i ref={i} className="fa fa-eye" aria-hidden="true"></i>
                  </div>
                  {signup.touched.password && (
                    <div style={{ color: "red" }} className="my-2">
                      {signup.errors.password}
                    </div>
                  )}
                  <label>&#x1F512;&nbsp; Your password</label>
                  <button
                    type="submit"
                    className="btn form-control py-3 mt-3 asdb"
                  >
                    <b>Sign-Up</b>
                    {loader && (
                      <div className="spin">
                        <div className="loader"></div>
                      </div>
                    )}
                  </button>
                </div>
                <div className="row mt-3 text-white">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-8">
                        <p style={{ opacity: "0.9" }}>Already have an account?</p>
                      </div>
                      <div className="col-4">
                        <p>
                          <b className="sig" onClick={login}>
                            Sign-In
                          </b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-md-6" style={{ background: '#BA7A30' }}>
              <div className="container">
                <div className="card m-4 shadow asd text-light">
                  <img src={opalogo} alt="" className='img-fluid mx mt-4 mx-3 mx-md-5 mb-2' />
                  <hr className='hrs mx-3 mx-md-5' />
                  <p><b className='mx-3 mx-md-5'>We make payments simple</b></p>
                  <h3><b className='mx-3 mx-md-5'>But Significant</b></h3>
                  <p><b className='mx-3 mx-md-5' style={{ opacity: '0.6' }}>Join 500+ Thousands of businesses using OPay</b></p>
                  <div className="row mx-auto mb-4">
                    <div className="col-6 col-md-6">
                      <img src={svgexport30} alt="" className='img-fluid' />
                    </div>
                    <div className="col-6 col-md-6">
                      <img src={svgexport31} className='img-fluid' alt="" />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-4 mx-auto">
                      <img src={download} alt="" className='img-fluid' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutDe