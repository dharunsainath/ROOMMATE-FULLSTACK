const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const crypto = require("crypto");
const User = require("../../model/user/user");
const generateToken = require("../../config/token/generateToken");
const validateMongodbId = require("../../utils/validateMongoDbID");


const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
    
    const userExists = await User.findOne({ email: req?.body?.email });
    if (userExists) throw new Error("User already exists");
    
    try {

        const name="dharun"

        console.log("try1")
        
      const user = await User.create({
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        password: req?.body?.password,
        phoneNumber: req?.body?.phoneNumber,
        bio: req?.body?.bio,
        age:req?.body?.age,
        token: generateToken(req?.body?.email)
      });

      console.log(user.token)

      console.log(user)
      
      res.json({user: user})
    } catch (error) {
      res.json(error);
    }
  });

  const loginUserCtrl = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if user exists
    const userFound = await User.findOne({ email });
    //Check if password is match
    if (userFound && (await userFound.isPasswordMatched(password))) {
      res.json({
        _id: userFound?._id,
        firstName: userFound?.firstName,
        lastName: userFound?.lastName,
        email: userFound?.email,
        profilePhoto: userFound?.profilePhoto,
        isAdmin: userFound?.isAdmin,
        token: userFound?.token,
        
      });


    } else {
      res.status(401);
      throw new Error("Invalid Login Credentials");
    }
  });

  const deleteUsersCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    //check if user id is valid
    validateMongodbId(id);
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      res.json(deletedUser);
    } catch (error) {
      res.json(error);
    }
  });

  const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
    console.log(req.headers);
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  });

  const updateUserCtrl = expressAsyncHandler(async (req, res) => {
    const { _id } = req?.user;
    validateMongodbId(_id);
    const user = await User.findByIdAndUpdate(
      _id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        bio: req?.body?.bio,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(user);
  });


  const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    //check if user id is valid
    validateMongodbId(id);
    try {
      const user = await User.findById(id);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  });



  module.exports ={
    userRegisterCtrl,
    loginUserCtrl,
    fetchUsersCtrl,
    fetchUserDetailsCtrl,
    deleteUsersCtrl,
    updateUserCtrl

  }