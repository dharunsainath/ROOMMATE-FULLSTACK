const express = require("express");

const userRoutes = express.Router();
const authMiddleware = require("../../middleware/auth/authMiddleware")

const {userRegisterCtrl,
    loginUserCtrl,fetchUsersCtrl 
    ,fetchUserDetailsCtrl,deleteUsersCtrl,updateUserCtrl
   } = require("../../controllers/user/usersCtrl")


userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);

userRoutes.get("/", authMiddleware, fetchUsersCtrl);
userRoutes.put("/:id", authMiddleware, updateUserCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);
userRoutes.delete("/:id", deleteUsersCtrl);


module.exports = userRoutes;