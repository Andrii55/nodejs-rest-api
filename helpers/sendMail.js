const nodemailer = require("nodemailer");

const { IMAIL_USER, IMAIL_PASS } = process.env;

async function sendMail(to, subject, html) {
  const email = {
    from: "ahomzyk@gmail.com",
    to,
    subject,
    html,
  };
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: IMAIL_USER,
      pass: IMAIL_PASS,
    },
  });
  await transport.sendMail(email);
  console.log(email);
}

module.exports = sendMail;
