

// how to send email from your website
// use nodemailer
const nodeMailer = require("nodemailer");

// options is an object containing req.body.email

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,  //smtp.gmail.com for gmail
    port: process.env.SMPT_PORT,  //405 for gmail
    service: process.env.SMPT_SERVICE,   //gmail for gmail
    auth: {
      user: process.env.SMPT_MAIL,  //jis acc se mail send hoga 
      pass: process.env.SMPT_PASSWORD, //us account ka password
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;