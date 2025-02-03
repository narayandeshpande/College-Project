import e from 'express';
import Bramhin from '../Models/Bramahn.model.js'
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import { createTokenAndSaveCookie } from '../JWT/generateToken.js';
const OTP = Math.floor(100000 + Math.random() * 900000)
export const signup = async (req, res) => {
  const { fullname, email, password, address, otp, no } = req.body;
  // console.log(fullname, email, password, address, otp, no)
  try {
    const bramhin = await Bramhin.findOne({ email: email })
    if (bramhin) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashpass = await bcryptjs.hash(password, 10);
    if (OTP == otp) {
      const newBramhin = await new Bramhin({
        fullname,
        email,
        password: hashpass,
        phone: no
      })
      await newBramhin.save();
      res.status(201).json({
        message: "User created successfully"
      })
    }
    else {
      res.status(500).json({
        message: "Invalid OTP"
      })
    }
  } catch (error) {
    console.log("error in signup controller" + error);
    res.status(500).json({ error: "Internal server error" })
  }
}
export const sendOTP = (req, res) => {
  const { email } = req.body
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        //  user:"narayandeshpande92@gmail.com",
        //  pass:"qavb tvvg rykt rnvt"
      }
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for creating Account",
      html: `<p>${OTP}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          message: "OTP send"
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const bramhan = await Bramhin.findOne({ email: email })
    if (!bramhan) {
      return res.status(400).json({ error: "Please create acount first" })
    }
    const isMatch = await bcryptjs.compare(password, bramhan.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" })
    }
    createTokenAndSaveCookie(bramhan._id, res)
    res.status(201).json({ message: "login successfuly" })
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const logout=(req,res)=>{
  try {
    res.clearCookie("jwt")
    res.status(200).json({ message: "Logout successfuly" })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}



