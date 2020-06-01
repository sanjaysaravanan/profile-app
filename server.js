// server.js
//
import path from "path";
import express from "express";

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.RESUME_EMAIL_ID,
    pass: process.env.RESUME_EMAIL_PASSWORD
  }
});

var mailOptions = {
  from: process.env.RESUME_EMAIL_ID,
  to: process.env.RESUME_EMAIL_ID,
  subject: "Hey, someone's trying to reach you",
  text: ""
};

// const express = require("express");
// const path = require("path");
const PORT = process.env.PORT || 4001;
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

// Serving frotend static files.
app.use(express.static(path.join(__dirname, "client/build")));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const payload = req.body;
  const { name, email, phone, message } = payload;
  mailOptions["text"] =
    "Name: " +
    name +
    "\nEmail: " +
    email +
    "\nPhone: " +
    phone +
    "\nMessage: " +
    message;

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.json({
        errorMsg: "Notification failed"
      });
    } else {
      console.log("Email sent: " + info.response);
      res.json({
        message: "Notification successfull."
      });
    }
  });
});

// -app.get('/', function (req, res) {
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Sample
app.get("/flower", (req, res) => {
  res.json({
    name: "Dandelion",
    colour: "Blue-ish"
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});
