const mongoose = require('mongoose');
const { UploadModel, BankModel, AddtocartModel } = require('../model/model');
const cloudinary = require('cloudinary');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { customermail, useraccountNumber, userName } = require('../mailer');
require('dotenv').config()

const regist = (req, res) => {
    const information = req.body;
    let useremail = req.body.email;
    let email = req.body.email;
    let accountNumber = req.body.accountNumber;
    let phoneno = req.body.phoneno;
    let Name = req.body.Name;
    BankModel.find({ email }, (err, message) => {
        if (err) { } else {
            if (message == "") {
                BankModel.find({ phoneno }, (err, result) => {
                    if (err) { } else {
                        if (result == "") {
                            BankModel.create(information, (err) => {
                                if (err) { } else {
                                    userName(Name)
                                    useraccountNumber(accountNumber)
                                    customermail(useremail)
                                    res.send({ message: "saved", status: true })
                                }
                            })
                        } else {
                            res.send({ message: "Phone-Number already used", status: false })
                        }
                    }
                })
            } else {
                res.send({ message: "Email already used", status: false })
            }

        }
    })
}

const login = (req, res) => {
    const { email, password } = req.body;
    BankModel.findOne({ email }, async (err, message) => {
        if (err) {
            res.send(err)
        } else {
            if (!message) {
                res.send({ status: false, message: "Email not found" })
            }
            else {
                const validPassword = await bcrypt.compare(password, message.password);
                if (validPassword) {
                    const token = jwt.sign({ _id: message._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
                    res.send({ token, message: "Token generated", status: true });
                } else {
                    res.send({ status: false, message: "Invaild password" })
                }
            }
        }
    })
}

const display = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.send({ status: false, message: "Invalid Token" })
        } else {
            let id = decoded._id;
            BankModel.find({ _id: id }, (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    if (result.length > 0) {
                        res.send({ result, status: true, message: "Valid Token" })
                    }
                    else {
                        // console.log(result);
                        res.send({ message: "empty array" })
                    }
                }
            })
        }
    })

}

const goods = (req, res) => {
    UploadModel.find((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({ result })
        }
    })
}

const account = (req, res) => {
    let accountNumber = req.body.account;
    BankModel.find({ accountNumber }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result == "") {
                res.send({ message: "account invalid", status: false })
            } else {
                res.send({ message: "account valid", result, status: true })
            }
        }
    })
}

const transpin = (req, res) => {
    const { password } = req.body;
    BankModel.findOne({ email }, async (err, message) => {
        if (err) {
            res.send(err)
        } else {
            if (!message) {
                res.send({ status: false, message: "Email not found" })
            }
            else {
                const validPassword = await bcrypt.compare(password, message.password);
                if (validPassword) {
                    const token = jwt.sign({ _id: message._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
                    res.send({ token, message: "Token generated", status: true });
                } else {
                    res.send({ status: false, message: "Invaild password" })
                }
            }
        }
    })
}

const addtocart = (req, res) => {
    let _id = req.body.val;
    let customerId = req.body.customerId;
    UploadModel.find({ _id }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            let addtocart = result[0];
            AddtocartModel.create({ ...req.body, customerId: customerId, product: addtocart.product, price: addtocart.price, file: addtocart.file, }, (err, message) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(message);
                }
            })
        }
    })
}

const getaddtocart = (req, res) => {
    let customerId = req.body.id
    AddtocartModel.find({ customerId }, (err, result) => {
        if (err) {
        } else {
            res.send({ result })
        }
    })
}
const removeaddtocart = (req, res) => {
    let { id } = req.body;
    AddtocartModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({ result });
        }
    })
}

module.exports = { display, login, regist, goods, addtocart, account, getaddtocart, removeaddtocart, transpin };