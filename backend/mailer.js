const nodemailer = require('nodemailer')
let date = new Date().toLocaleString();

const customermail = async (emails) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.email",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAIL_PASSWORD
    }
  })

  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: emails.useremail,
    subject: "Opay Bank ✔",
    // text: "Hello world?",
    html: `<div
        style="
          background: #f0f0f0;
          transition: 0.5s;
          font-family: Courier New monospace;
          padding: 20px;
        ">
        <h3 style="text-align: center">
          Dear ade. <br /> welcome to Opay Bank.<br />
          Your new account number is ${emails.accountNumber}.<br />
          Thanks for bank with us.
        </h3>
        <h4 style="text-align: center">
          Contact 09044796430 or Email: ogunweoluwadebo@gmail.com <br />
          for WEB APP DEVELOPMENT
        </h4>
      </div>`,
  });

  console.log(info);
}

const adminmail = async (emails) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.email",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAIL_PASSWORD
    }
  })

  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: emails,
    subject: "Anthony app ✔",
    // text: "Hello world?",
    html: `<div
        style="
          background: #f0f0f0;
          transition: 0.5s;
          font-family: Courier New monospace;
          padding: 20px;
        ">
        <h2 style="text-align: center">
          THANKS FOR CREATING AN ACCOUNT WITH US.
        </h2>
        <h3 style="text-align: center">
          Welcome to our site. <br />
          Your account as one of our admin, was successfully created at <span>${date}</span>.
        </h3>
        <h4 style="text-align: center">
          Contact 09044796430 or Email: ogunweoluwadebo@gmail.com <br />
          for WEB SITE DEVELOPMENT
        </h4>
      </div>`,

  });

  console.log(info);
}

module.exports = { customermail, adminmail }