const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
    },
    //Created by only category
    category: {
      type: String,
      enum: ["Apartments", "Villa", "Flats"],
      required: [true, "Post category is required"],
      
    },
   
    
    
    userHosted: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    },
    description: {
      type: String,
      required: [true, "Post description is required"],
    },
    address: {
      type: String,
      required: [true, "Post address is required"],
    },
    rentalDetails:{
      type:[],
      required: [true, "Post rental details"]
    },
    totalMembers:{
      type: Number,
      required: [true, "Total members"]

    },
    roommateDetails:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
        
    }],

    occupiedMembers:{
      type: Number,
      required: [true, "occupied members"]



    },
    date:{
      type:Date,
      
      default:Date.now()
    
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/10/25/09/23/seagull-5683637_960_720.jpg",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//compile
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
