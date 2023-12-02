import dotenv from "dotenv";

import nodemailer from "nodemailer";

dotenv.config();

const sendVerificationEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: "Verify Your Email",
    text: `Please verify your email by clicking on this link: ${process.env.BACKEND_URL}/users/verify/${user.verificationToken}`,
    html: `<p>Please verify your email by clicking on this link: <a href="${process.env.BACKEND_URL}/users/verify/${user.verificationToken}">${process.env.BACKEND_URL}/users/verify/${user.verificationToken}</a></p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendVerificationEmail;
