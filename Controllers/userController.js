const asynchandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');




// Registering User



const register = asynchandler(async (req,res)=>{

    const{username,email,password} = req.body;

    //Checking  If all details are filled
    if(!username || !email || !password){
        res.status(400).json({message:"All fields are mandatory!"});
    }

   // Checking for Existing User
    const existingUsername = await User.findOne({ username: { $regex: new RegExp(username, 'i') } });
    if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email: { $regex: new RegExp(email, 'i') } });
    if (existingEmail) {
        return res.status(400).json({ message: "Email already registered" });
    }

    // Hashing the password for security
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);

    // Creating User
    const user = await User.create({
        username,email,password:hashedPassword
    });
    if(user){
        res.status(201).json({message:`Successfully registered User with name ${user.username}`});
    }else{
        res.status(400).json({message:"User data is not valid"});
        
    }
     
});


// Login User


const login = asynchandler(async (req,res)=>{
    const {username,password} = req.body;

    // Finding the User
    const user = await User.findOne({username});
    if(!user){
        res.status(401).json({error:'Invalid  Username'});
    }

    // Checking Password
    const isPassword = await bcrypt.compare(password,user.password);
    if(!isPassword){
        res.status(401).json({error:"Invalid Password"});
    }

    // Generating and sending JWT Token
    const token = jwt.sign({userId:user._id},'hellobuddy');
    res.json({message:token});
});


// Frogot Password==>Password Recovery

const forgot= asynchandler(async (req,res)=>{
    const {email} = req.body;
    // Finding User by Email
    const user = await User.findOne({email});
    if(!user){
        res.status(404).json({error:'User not found'});
    }
    // Generating a temporary password
    const tempPwd = Math.random().toString(36).slice(-7);

    // Updating the password in user's database
    user.password = await bcrypt.hash(tempPwd,10);
    await user.save();
    // Send the temporary password to the user's email
     const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:'abhinavsingh021094@gmail.com',

          pass: 'bziw dvzl ixzh exhk',
        },
      });
      const mailOptions = {
        from: 'abhinavsingh021094@gmail.com',
        to: user.email,
        subject: 'Password Recovery',
        text: `Your new password is: ${tempPwd}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
          return res.status(500).json({ error: 'Failed to send email' });
        }
        res.json({ message: 'Password recovery email sent successfully' });
      });



    // res.json({password:tempPwd});
})

module.exports = {register,login,forgot};
