const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");

const { User } = require("../model/userModel");
const { Otp } = require("../model/otpModel");

module.exports.signUp = async (req, res) => {
  const user = await User.findOne({
    number: req.body.number,
  });

  if (user) return res.status(400).send("user already registered");
  const OTP = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });
  const number = req.body.number;

  console.log(OTP);

  const otp = new Otp({ number: number, otp: OTP });
  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);
  const result = await otp.save();
  return res.status(200).send("OTP send successfully");
};

module.exports.verifyOtp = async (req, res) => {};
