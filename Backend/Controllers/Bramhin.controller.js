import Bramhin from '../Models/Bramahn.model.js'
// import workInfo from '../Models/WorkInfo.model.js'
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import { createTokenAndSaveCookie } from '../JWT/generateToken.js';
import workInfo from '../Models/WorkInfo.model.js';
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

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt")
    res.status(200).json({ message: "Logout successfuly" })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export const acceptWork = async (req, res) => {
  const { workid } = req.body
  // console.log(workid)
  try {
    //find work by id
    const work = await workInfo.findOne({ _id: workid })
    // console.log(work)
    if (!work) {
      return res.status(400).json({ error: "No work found" })
    }

    //check if all bramhan already accepted
    if (work.noOfBramhanweave >= work.noOfBramhanrequired) {
      return res.status(400).json({ error: "All bramhan already accepted" })
    }

    //check if bramhan already accepted
    const allRedyPresent = await workInfo.findOne({
      _id: workid,
      bramhan: { $in: [req.bramhan._id] }
    });

    if (allRedyPresent) {
      // console.log(allRedyPresent)
      return res.status(400).json({ error: "You already accepted this work" })
    }
    //accept work
    const bramhan = await Bramhin.findByIdAndUpdate(
      req.bramhan._id,
      { $push: { worksaceept: workid } },
      { new: true, useFindAndModify: false })

      //update noOfBramhanweave in workInfo
    await workInfo.findByIdAndUpdate(
      workid,
      { $inc: { noOfBramhanweave: 1 } },
      { new: true, useFindAndModify: false })

      //update noOfBramhanrequired in workInfo
    await workInfo.findByIdAndUpdate(
      workid,
      { $inc: { noOfBramhanrequired: -1 } },
      { new: true, useFindAndModify: false })

      //update bramhan in workInfo
    await workInfo.findByIdAndUpdate(
      workid,
      { $push: { bramhan: req.bramhan._id } },
      { new: true, useFindAndModify: false })

    res.status(201).json({ message: "Work accepted" })
  } catch (error) {
    console.log("error in acceptwork controller" + error);
    res.status(500).json({ error: "Internal server error" })

  }
}



