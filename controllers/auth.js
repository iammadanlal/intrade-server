"use strict";

const User = require("../models/user-model");
const Company = require("../models/company-modal");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const JWT_SECRET = "lkjhgfdsaasdfghjkl@#$%^&*()_+poiuytrewqqwertyuiop";

module.exports = {
  SignUpUser: signUp,
  LoginUser: loginUser,
  ForgetPassword: forgetPassword,
  SignUpCompany: signUpCompany,
  getAllUsers,
};

//handle errors
const handleErrors = (err) => {
  let error = { status: "error", msg: err.message };

  //incorrect email
  if (err.message === "Incorrect email") {
    error.msg = "Entered email is not registered";
  }

  //incorrect password
  else if (err.message === "Incorrect Password") {
    error.msg = "Entered password is incorrect";
  }

  // user schema validation error
  else if (err._message === "User validation failed") {
    const errObjKey = Object.keys(err.errors)[0];
    console.log(err.errors[errObjKey].properties);
    error.msg = err.errors[errObjKey].properties.message;
  }

  // forget password mail not found
  else if (err.message === "MNF") {
    error.msg = "Please enter email.";
  }

  // user not found
  else if (err.message === "UNF") {
    error.msg = "No user found with this email!";
  }

  // NA not found
  else if (err.message === "NA") {
    error.msg = "You are not authorized!";
  }

  //duplicate error code
  else if (err.code === 11000) {
    error.msg = "Entered email is already registered";
  }
  // unknown errors
  else {
    console.error(err);
  }

  return error;
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
async function signUpCompany(req, res) {
  const DOC_DATA = {
    nature_of_business: req.body["nature"] || null,
    business_address: req.body["business"] || null,
    communication_details: req.body["communication"] || null,
    isVerified: false,
  };

  Company.create(DOC_DATA)
    .then((doc) => {
      // console.log(doc);
      return res.json({ status: "ok" });
    })
    .catch((err) => {
      return res.json({ status: "error" });
    });
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */

async function signUp(req, res) {
  // destruct the body
  let { user_name, password, email } = req.body;

  try {
    //   create user
    const user = await User.create({
      user_name,
      email,
      password,
    });

    // jws token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.email,
      },
      JWT_SECRET
    );

    // customize data to send to user
    const data = {
      user: user,
      token: token,
    };

    return res.json({ status: "ok", data: data });
  } catch (error) {
    //   handling errors
    const err = handleErrors(error);
    return res.status(400).json(err);
  }
}

/**
 *
 * @param req
 * @param res
 */

async function loginUser(req, res) {
  // destruct data from body
  const { email, password } = req.body;
  try {
    // user login
    const user = await User.login(email, password);

    // jws token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.email,
      },
      JWT_SECRET
    );

    // customize data to send to user
    const data = {
      user: user,
      token: token,
    };
    return res.json({ status: "ok", data: data });
  } catch (error) {
    // handling errors
    const err = handleErrors(error);
    res.status(400).json(err);
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 */

async function forgetPassword(req, res) {
  try {
    // generate random password
    const randomPassword = Math.random().toString(36).substr(2, 6);
    // hash password
    const newPassword = await bcrypt.hash(randomPassword, 10);

    const { mailId } = req.body;

    if (!mailId) {
      // throw error if mail not found
      throw new Error("MNF");
    }
    // user find filter
    const filter = { email: mailId };

    // check if user exists with email or not
    const user = await User.findOne(filter);

    if (!user) {
      // throw error if user not found
      throw new Error("UNF");
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      //   host: "mail.protonmail.com",
      //   port: 587,
      //   secure: false,
      auth: {
        user: "madanparmar637@gmail.com", // emial of company to send message to users
        pass: "wgqmbgvbbqxwpirw",
      },
    });

    //

    let mailOptions = {
      from: "madanparmar637@gmail.com",
      to: mailId,
      subject: "Forget Password Response",
      text: `Hi, there,\nyou having problem with login :- \nUser New Password is :- ${randomPassword} for ${mailId}`,
    };

    // send mail
    const info = await transporter.sendMail(mailOptions);

    console.log(info);

    // find the user with given email and update password
    await User.findOneAndUpdate(filter, { password: newPassword });

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    // handling errors
    const err = handleErrors(error);
    return res.status(400).json(err);
  }
}

async function getAllUsers(req, res) {
  try {
    const { admin } = req.body;
    // just check admin is there or not
    if (!admin) {
      throw new Error("NA");
    }
    // get all users
    const users = await User.find();

    return res.status(200).json({ status: "ok", data: users });
  } catch (error) {
    // handling errors
    const err = handleErrors(error);
    return res.status(400).json(err);
  }
}
