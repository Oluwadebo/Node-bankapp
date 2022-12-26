import React from 'react'
import { useEffect, useState } from "react"
import axios from 'axios';
import { baseUrl } from "./endpoint";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import imgavatar3 from './assets/pic/img_avatar3.png'
import svgexport1 from './assets/pic/svgexport-1.png'
import Withdrawal from './assets/pic/Withdrawal.png'
import Otransfer from './assets/pic/Otransfer.png'
import paybill from './assets/pic/paybill.png'
import Addmoneytobalance from './assets/pic/Addmoneytobalance.png'
import App from '../App'

const Dashboard = (props) => {
    const navigate = useNavigate()
    const [customers, setcustomers] = useState([])
    const [balance, setbalance] = useState([])
    const bank = localStorage.bank;
    const [allUser, setallUser] = useState([])
    const [currentuser, setcurrentuser] = useState('')
    const [currentuserdetails, setcurrentuserdetails] = useState({})
    const [customer, setcustomer] = useState({})
    const [User, setUser] = useState({})
    const [first, setfirst] = useState()
    const [amount, setamount] = useState(0)
    const [account, setaccount] = useState("")
    const [Decoder, setDecoder] = useState("")
    const [Error, setError] = useState('')

    // useEffect(() => {
    //     if (localStorage.member && localStorage.signinEmail && localStorage.users) {
    //         let AllUser=JSON.parse(localStorage.member)
    //         setallUser(JSON.parse(localStorage.member))  
    //         setcurrentuser(JSON.parse(localStorage.signinEmail))  
    //         setcurrentuserdetails(JSON.parse(localStorage.users))
    //         let email =  JSON.parse(localStorage.users).email
    //         let index=JSON.parse(localStorage.member).findIndex((x)=>x.email==email)
    //         setcustomer(AllUser[index])
    //     }else{
    //         navigate('/SignIn')
    //     }
    // }, [])
    // console.log(customer);
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
                            setcustomers(data.data.result[0]);
                            localStorage.customerId = data.data.result[0]._id
                            // axios.post(`${baseUrl}addtocart`, { val, customerId })
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
    const add = () => {
        if (account !== "" && amount !== "") {
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
                            setbalance(data.data.result[0].balance);
                        } else {
                            localStorage.removeItem('bank')
                            localStorage.removeItem('customerId')
                            navigate("/SignIn")
                        }
                    }
                })
        }
        let email = currentuserdetails.email
        let hass = allUser.find((item, index) => item.email === email);
        let index = allUser.findIndex((x) => x.email == email)
        let customer = allUser[index]
        if (account !== "" && amount !== "") {
            let User = { account, amount }
            let remain = parseInt(allUser[index].accountBalance) + parseInt(amount);
            setallUser(
                allUser[index].accountBalance = remain
            )
            localStorage.setItem('member', JSON.stringify(allUser))
        } else {
            let err = "Please fill all your input outlet"
            setError(err)
        }
        window.location.reload()
    }
    const Confirm = () => {
        let email = currentuserdetails.email
        let hass = allUser.find((item, index) => item.email === email);
        let index = allUser.findIndex((x) => x.email == email)
        let customer = allUser[index]
        if (account !== "" && amount !== "") {
            let User = { account, amount }
            let remain = allUser[index].accountBalance - amount;
            setallUser(
                allUser[index].accountBalance = remain
            )
            console.log(allUser[index].accountBalance);
            localStorage.setItem('member', JSON.stringify(allUser))
            window.location.reload()
        } else {
            let err = "Please fill all your input outlet"
            setError(err)
        }
    }
    const Recharge = () => {
        let email = currentuserdetails.email
        let hass = allUser.find((item, index) => item.email === email);
        let index = allUser.findIndex((x) => x.email == email)
        let customer = allUser[index]
        if (account !== "" && amount !== "" && Decoder !== "") {
            let User = { account, amount, Decoder }
            let remain = allUser[index].accountBalance - amount;
            setallUser(
                allUser[index].accountBalance = remain
            )
            console.log(allUser[index].accountBalance);
            localStorage.setItem('member', JSON.stringify(allUser))
            window.location.reload()
        } else {
            let err = "Please fill all your input outlet"
            setError(err)
        }
    }
    const AirTimes = () => {
        let email = currentuserdetails.email
        let hass = allUser.find((item, index) => item.email === email);
        let index = allUser.findIndex((x) => x.email == email)
        let customer = allUser[index]
        if (account !== "" && amount !== "") {
            let User = { account, amount }
            let remain = allUser[index].accountBalance - amount;
            setallUser(
                allUser[index].accountBalance = remain
            )
            console.log(allUser[index].accountBalance);
            localStorage.setItem('member', JSON.stringify(allUser))
            window.location.reload()
        } else {
            let err = "Please fill all your input outlet"
            setError(err)
        }
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
            <div className="mt-5">
                <div className="container">
                    <div className="row pt-4">
                        <div className="col-6 d-flex">
                            <img src={imgavatar3} alt="" className='img-fluid rounded-circle me-2' width="40" height="40" />
                            <h5 className='pt-2'><b>{customers.Name}</b></h5>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6"><h5 className='pt-2' style={{ float: 'right' }}>History</h5></div>
                                <div className="col-6"><h5 className='pt-2' style={{ float: 'right' }}>{customers.history}</h5></div>
                            </div>
                        </div>
                    </div>
                    <div className="row my-3 p-3 shadow ad">
                        <div className="col-12 col-md-6">
                            <div className="row">
                                <div className="col-9">
                                    <p className='pt-2'>Account Number</p>
                                </div>
                                <div className="col-3">
                                    <h5 className='pt-2' style={{ float: 'right' }}>{customers.accountNumber}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="row">
                                <div className="col-8">
                                    <p className='pt-2'>Total Balance</p>
                                </div>
                                <div className="col-4">
                                    <h5 className='pt-2' style={{ float: 'right' }}><b>₦</b> {customers.balance}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-md-5 mx-0">
                        <div className="col-4 col-md-3 mx-4 mx-md-auto">
                            <button type="button" className="btn asd" data-bs-toggle="modal" data-bs-target="#Money">
                                <img src={Withdrawal} alt="" className='img-fluid rounded-circle me-2' width="60" height="60" />
                                <h5 className='pt-2'>Add Money</h5>
                            </button>
                            <div className="modal" id="Money" data-bs-backdrop="static">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5>Add Money</h5>
                                        </div>
                                        <div className="modal-body">
                                            <div>
                                                <p><b className='text-danger'>{Error}</b></p>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Recipient Account</label>
                                                    <input type="number" className="form-control" placeholder='Recipient Account Number' onChange={(e) => setaccount(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Amount</label>
                                                    <input type="number" placeholder='Amount' className='form-control' onChange={(e) => setamount(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Your Balance</label>
                                                    <h5 className='pt-2'><b>₦</b> {customers.balance}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close transaction</button>
                                            <button type="button" className="btn btn-primary" onClick={add}>Confirm transaction</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-3 mx-4 mx-md-auto">
                            <button type="button" className="btn asd" data-bs-toggle="modal" data-bs-target="#transfer">
                                <img src={Otransfer} alt="" className='img-fluid rounded-circle me-2' width="60" height="60" />
                                <h5 className='pt-2'>Transfer</h5>
                            </button>
                            <div className="modal" id="transfer" data-bs-backdrop="static">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5>Transfer</h5>
                                        </div>
                                        <div className="modal-body">
                                            <div>
                                                <p><b className='text-danger'>{Error}</b></p>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Recipient Account</label>
                                                    <input type="number" className="form-control" placeholder='Recipient Account Number' onChange={(e) => setaccount(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Amount</label>
                                                    <input type="number" placeholder='Amount' className='form-control' onChange={(e) => setamount(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Your Balance</label>
                                                    <h5 className='pt-2'><b>₦</b> {customers.balance}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close transaction</button>
                                            <button type="button" className="btn btn-primary" onClick={Confirm}>Confirm transaction</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-3 mx-4 mx-md-auto">
                            <button type="button" className="btn asd" data-bs-toggle="modal" data-bs-target="#Bills">
                                <img src={paybill} alt="" className='img-fluid rounded-circle me-2' width="60" height="60" />
                                <h5 className='pt-2'>Bills</h5>
                            </button>
                            <div className="modal" id="Bills" data-bs-backdrop="static">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5>Decoder Recharge</h5>
                                        </div>
                                        <div className="modal-body">
                                            <div>
                                                <p><b className='text-danger'>{Error}</b></p>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Decoder Name</label>
                                                    <input type="text" className="form-control" placeholder='Example DSTV' onChange={(e) => setaccount(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Decoder Number</label>
                                                    <input type="number" placeholder='Example 09897899788' className='form-control' onChange={(e) => setDecoder(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Amount</label>
                                                    <input type="number" placeholder='Amount' className='form-control' onChange={(e) => setamount(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Your Balance</label>
                                                    <h5 className='pt-2'><b>₦</b> {customers.balance}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close transaction</button>
                                            <button type="button" className="btn btn-primary" onClick={Recharge}>Confirm transaction</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-3 mx-4 mx-md-auto">
                            <button type="button" className="btn asd" data-bs-toggle="modal" data-bs-target="#AirTimes">
                                <img src={Addmoneytobalance} alt="" className='img-fluid rounded-circle me-2' width="60" height="60" />
                                <h5 className='pt-2'>Recharge</h5>
                            </button>
                            <div className="modal" id="AirTimes" data-bs-backdrop="static">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">AirTimes</h5>
                                        </div>
                                        <div className="modal-body">
                                            <div>
                                                <p><b className='text-danger'>{Error}</b></p>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Net-work</label>
                                                    <input type="text" className="form-control" placeholder='MTN' onChange={(e) => setaccount(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Amount</label>
                                                    <input type="number" placeholder='Amount' className='form-control' onChange={(e) => setamount(e.target.value)} style={{ backgroundColor: '#F5F7FA' }} />
                                                </div>
                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Your Balance</label>
                                                    <h5 className='pt-2'><b>₦</b> {customers.balance}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close transaction</button>
                                            <button type="button" className="btn btn-primary" onClick={AirTimes}>Confirm transaction</button>
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

export default Dashboard