import React from 'react'
import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import svgexport30 from './assets/pic/svgexport-30.png'
import svgexport31 from './assets/pic/svgexport-31.png'
import opalogo from './assets/pic/logo-light.png'
import download from './assets/pic/download.png'
import svgexport1 from './assets/pic/svgexport-1.png'

const AboutDe = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [allUser, setallUser] = useState([])
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
  const signin = () => {
    let debo = JSON.parse(localStorage.getItem("member"))
    if (email !== "" && password !== "") {
      for (const a of debo) {
        let User = { email, password }
        if (a["email"] === User.email && a["password"] === User.password) {
          localStorage.signinEmail = JSON.stringify(email);
          localStorage.users = JSON.stringify(a)
          navigate('/Dashboard')
        } else {
          let err = "Please confirm you fill input outlet correctly"
          setError(err)
        }
      }
    } else {
      let err = "Please fill all your input outlet"
      setError(err)
    }
  }
  let myStyle = {
    fontSize: '20px',
  }
  let mySpa = {
    color: '#1FC69D'
  }
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
              <Link to="/signUp"><button className='btn form-control' style={{ background: '#1FC69D', border: 'none' }}>Sign-Up</button></Link>
            </span>
          </div>
        </div>
      </nav>
      <div className="mt-5">
        <div className="container">
          <div className="row pt-5">
            <p><b className='text-danger'>{Error}</b></p>
            <div className="col-12 col-md-6 rig">
              <img src={opalogo} alt="" className='img-fluid mx-auto mt-5' />
              <h5><b>Welcome back.</b></h5>
              <div className='form-floating mt-4'>
                <input type="email" placeholder='Your email' className='form-control' onChange={(e) => setemail(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                <label>&#x1F4E7;&nbsp; Your email</label>
              </div>
              <div className='form-floating my-4'>
                <input type="password" placeholder='Your password' maxLength={10} className='form-control' onChange={(e) => setpassword(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                <label>&#x1F512;&nbsp; Your password</label><br />
                <button onClick={signin} className='btn form-control py-3' style={{ background: '#1FC69D', border: 'none' }}>Sign-In</button>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-8">
                      <p style={{ opacity: '0.6' }}>Don't have an account?</p>
                    </div>
                    <div className="col-4">
                      <p><b><Link to="/SignUp" className='sig'>Sign up</Link></b></p>
                    </div>
                  </div>
                </div>
              </div>
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