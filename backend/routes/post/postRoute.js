const express = require("express");
const {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  
} = require("../../controllers/posts/postCtrl");
const authMiddleware = require("../../middleware/auth/authMiddleware");
// const {
//   photoUpload,
//   postImgResize,
// } = require("../../middlewares/uploads/photoUpload");

const postRoute = express.Router();

postRoute.post(
  "/",
  authMiddleware,
  
  createPostCtrl
);


postRoute.get("/", fetchPostsCtrl);
postRoute.get("/:id",authMiddleware, fetchPostCtrl);
postRoute.put("/:id", authMiddleware, updatePostCtrl);
postRoute.delete("/:id", authMiddleware, deletePostCtrl);
module.exports = postRoute;
