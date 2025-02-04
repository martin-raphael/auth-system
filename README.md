﻿# auth-system

README
Project Overview
This project is an Express.js application that handles user signup and OTP (One-Time Password) verification. It allows users to register with their phone numbers and receive an OTP for verification. The OTP is sent to the user's phone number, and once verified, the user is successfully registered.

Project Structure
The project is organized into several key components:

Server Setup:
app.js: The main entry point for the application. It sets up the Express server and the user routes.
Routers/userRouter.js: Defines the routes for user signup and OTP verification.
Controllers/userController.js: Contains the logic for user signup and OTP verification.
Models:
model/userModel.js: Defines the User schema and methods.
model/otpModel.js: Defines the Otp schema and methods.
Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
cd <repository-directory>
Install dependencies:

bash
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory and add the following:

env
Copy code
JWT_SECRET_KEY=your_jwt_secret_key
Start the server:

bash
Copy code
npm start
Usage
User Signup
Endpoint: POST /api/user/signup

Request Body:

json
Copy code
{
    "number": "user_phone_number"
}
Response:

200 OK: OTP sent successfully.
400 Bad Request: User already registered.
Verify OTP
Endpoint: POST /api/user/signup/verify

Request Body:

json
Copy code
{
    "number": "user_phone_number",
    "otp": "received_otp"
}
Response:

200 OK: User registered successfully with JWT token.
400 Bad Request: Expired OTP or incorrect OTP.
Code Explanation
Server Setup (app.js)
javascript
Copy code
const express = require("express");
const app = express();
const userRouter = require("./Routers/userRouter");

app.use(express.json());
app.use("/api/user", userRouter);

module.exports = app;
This file sets up the Express server and the /api/user route using userRouter.

User Router (Routers/userRouter.js)
javascript
Copy code
const router = require("express").Router();
const { signUp, verifyOtp } = require("../Controllers/userController");

router.route("/signup").post(signUp);
router.route("/signup/verify").post(verifyOtp);

module.exports = router;
This file defines the routes for user signup and OTP verification.

User Controller (Controllers/userController.js)
javascript
Copy code
const bcrypt = require("bcrypt");
const _ = require("lodash");
const otpGenerator = require("otp-generator");
const { User } = require("../model/userModel");
const { Otp } = require("../model/otpModel");

module.exports.signUp = async (req, res) => {
  const user = await User.findOne({ number: req.body.number });
  if (user) return res.status(400).send("user already registered");

  const OTP = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: 
