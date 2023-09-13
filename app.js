const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const nodemailer = require("nodemailer");

require("dotenv").config();

// const { IMAIL_USER, IMAIL_PASS } = process.env;

const {
  contactsRouter,
  authRouter,
  imagesRouter,
  verifyRouter,
} = require("./routes/api");

// async function main() {
//   try {
//     const transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: IMAIL_USER,
//         pass: IMAIL_PASS,
//       },
//     });
//     const email = {
//       from: "ahomzyk@meta.ua",
//       to: "noresponse@gmail.com",
//       subject: "Nodemailer test",
//       text: "Привіт. Ми тестуємо надсилання листів!",
//     };

//     const response = await transport.sendMail(email);
//     console.log("response: ", response);
//   } catch (e) {
//     console.error("Aplication error:", e);
//   }
// }

// main();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/", authRouter);
app.use("/api/", imagesRouter);
app.use("/api/", verifyRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json({ message: "Email in use" });
  }

  res.status(500).json({ message: err.message });
});

module.exports = app;
