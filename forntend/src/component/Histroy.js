import React from 'react'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { baseUrl } from "./endpoint";
import axios from 'axios';
import svgexport1 from './assets/pic/svgexport-1.png'
import { Link } from 'react-router-dom'

const Histroy = () => {
    const [histo, sethisto] = useState([])
    const navigate = useNavigate()
    const bank = localStorage.bank;
    const customerId = localStorage.customerId;
    const [mess, setmess] = useState("")

    useEffect(() => {
        if (bank) {
            axios.get(`${baseUrl}dashboard`,
                {
                    headers: {
                        "Authorization": `Bearer ${bank}`,
                        "Content-type": "application/json",
                        "Accept": "application/json"
                    }
                }).then((data) => {
                    if (data) {
                        let Err = data.data.message;
                        if (Err == "Valid Token") {
                            axios.post(`${baseUrl}gethistory`, { customerId }).then((data) => {
                                if (data) {
                                    let history = data.data.message;
                                    if (history == "history seen") {
                                        sethisto(data.data.result);
                                    } else {
                                        let messa = data.data.message;
                                        setmess(messa)
                                    }
                                }
                            })
                        } else {
                            localStorage.removeItem('bank')
                            localStorage.removeItem('customerId')
                            navigate("/SignIn")
                        }
                    }
                })
        } else {
            navigate("/SignIn")
        }
    }, [])
    const logout = () => {
        localStorage.removeItem("bank")
        navigate('/SignIn')
    }
    let myStyle = {
        fontSize: '20px',
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
                                <Link to="/Dashboard" className="nav-link text-dark" aria-current="page" style={myStyle}>Home</Link>
                            </li>
                            <li className="nav-item px-3">
                                <Link to="/SignIn" className="nav-link text-dark" style={myStyle}>SignIn</Link>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            <button onClick={logout} className='btn form-control text-light' style={{ background: '#1FC69D', border: 'none' }}>Sign-Out</button>
                        </span>
                    </div>
                </div>
            </nav>
            <div className="my-5">
                <div className="container py-1 py-md-5">
                    <div className='shadow p-5 my-md-5 my-0' style={{ background: "rgba(255,255,255,.2)", backdropFilter: "blur(5px)", borderRadius: "5px" }}>
                        <h3 className='alig'>{mess}</h3>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Histroy