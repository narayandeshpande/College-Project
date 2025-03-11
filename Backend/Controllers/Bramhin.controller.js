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
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🔐 Your One-Time Password (OTP) for Account Verification",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              font-size: 24px;
              font-weight: bold;
              color: #333;
            }
            .otp {
              font-size: 28px;
              font-weight: bold;
              color: #ff5733;
              text-align: center;
              margin: 20px 0;
            }
            .message {
              font-size: 16px;
              color: #333;
              line-height: 1.5;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #777;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">🔐 Account Verification OTP</div>
            
            <p class="message">Dear Customer,</p>
            <p class="message">To complete your profile creation/update, please use the OTP below to verify your identity.</p>
    
            <div class="otp">${OTP}</div>
    
            <p class="message"><strong>Note:</strong> Please do not share this OTP with anyone. Our team will never ask for it.</p>
            <p class="message">If you did not request this OTP, you may ignore this email.</p>
    
            <hr>
    
            <div class="header">🔐 खात्याची ओळख पटवण्यासाठी OTP</div>
    
            <p class="message">प्रिय ग्राहक,</p>
            <p class="message">तुमच्या प्रोफाइलच्या निर्मिती/सुधारणेसाठी, कृपया खालील OTP वापरून तुमची ओळख सत्यापित करा.</p>
    
            <div class="otp">${OTP}</div>
    
            <p class="message"><strong>टीप:</strong> कृपया हा OTP कोणालाही शेअर करू नका. आमची टीम तो कधीही विचारणार नाही.</p>
            <p class="message">जर तुम्ही हा OTP मागवलेला नसेल, तर कृपया हा ईमेल दुर्लक्षित करा.</p>
    
            <div class="footer">Thank you | धन्यवाद!</div>
          </div>
        </body>
        </html>
      `
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "OTP sent successfully" });
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


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

export const allAcceptedWork = async (req, res) => {
  try {
    const bramhan = req.bramhan;

    // Use Promise.all to wait for all async operations
    const allwork = await Promise.all(
      bramhan.worksaceept.map(async (id) => {
        return await workInfo.findById(id);
      })
    );
    // console.log(allwork); // Now it contains all the fetched work
    res.status(200).json(allwork);
  } catch (error) {
    console.log("error in allAcceptedWork controller" + error);
    res.status(500).json({ error: "Internal server error" })
  }
}

export const allCreatedWork = async (req, res) => {
  try {
    const bramhan = req.bramhan;
    const allwork = await Promise.all(
      bramhan.workscreate.map(async (id) => {
        return await workInfo.findById(id);
      })
    );
    // console.log(allwork)
    res.status(200).json(allwork)
  } catch (error) {
    console.log("error in allCreatedWork controller" + error);
    res.status(500).json({ error: "Internal server error" })

  }
}

export const updateProfile = async (req, res) => {
  const { fullname, email, password, no, place, otp } = req.body;
  //  console.log(fullname,email,password,no,place)
  try {

    if (OTP == otp) {
      const hashpass = await bcryptjs.hash(password, 10);
      const bramhan = await Bramhin.findByIdAndUpdate(req.bramhan._id, {
        fullname,
        email,
        password: hashpass,
        phone: no,
        address: place
      })
      await bramhan.save();
      res.status(201).json({ message: "Profile updated successfully" })
    }
    else {
      res.status(500).json({ message: "Invalid OTP" })
    }
  } catch (error) {
    console.log("error in updateProfile controller" + error);
    res.status(500).json({ error: "Internal server error" })

  }
}


