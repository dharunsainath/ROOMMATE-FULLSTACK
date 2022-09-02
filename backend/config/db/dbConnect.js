const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://dharunn:snehamurali@roommates.ff74fiw.mongodb.net/?retryWrites=true&w=majority", {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Db is Connected Successfully");
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};

module.exports = dbConnect;
