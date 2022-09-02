const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./routes/user/userRoutes")
const { errorHandler, notFound } = require("./middleware/error/errorHandler");
const postRoute = require("./routes/post/postRoute");
dotenv.config();
const cors = require("cors")

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 7777
dbConnect();


app.use(cors())
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoute);





app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server is running ${PORT}`));