const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            required: [true, "First name is required"],
            type: String,
          },
          lastName: {
            required: [true, "Last name is required"],
            type: String,
          },
          profilePhoto: {
            type: String,
            default:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          },
          email: {
            type: String,
            required: [true, "Email is required"],
          },
          phoneNumber: {
            type:Number,
            required: [true, "phone number is required"],
          },
          bio: {
            type: String,
          },
          DOB:{
            type:Date
          },
          age:{
            type: Number,
          },
          password: {
            type: String,
            required: [true, "Hei buddy Password is required"],
          },
          postCount: {
            type: Number,
            default: 0,
          },
          role: {
            type: String,
            enum: ["Admin", "Guest", "Blogger"],
            default: "Blogger",
          },
          isAccountVerified: { type: Boolean, default: false },
          accountVerificationToken: String,
          accountVerificationTokenExpires: Date,
          
          token:{type: String},

          passwordChangeAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    }
)

userSchema.virtual("posts", {
    ref: "Post",
    foreignField: "user",
    localField: "_id",
  });

  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  userSchema.methods.createAccountVerificationToken = async function () {
    //create a token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    this.accountVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000; //10 minutes
    return verificationToken;
  };
  
  //Password reset/forget
  
  userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes
    return resetToken;
  };
  









  const User = mongoose.model("User", userSchema);

  module.exports = User;