var express = require("express");
var router = express.Router();

const adminController = require("../controllers/adminController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const passport = require("passport");

router.get("/", (req, res) => res.json({ message: "Admin" }));

router.get("/log-in", (req, res) => {
  res.render("adminLogInForm");
});
router.post("/log-in", adminController.adminLogIn);

router.get("/sign-up", (req, res, next) => {
  res.render("adminSignUpForm");
});
router.post("/sign-up", adminController.adminSignUp);

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postController.postListGet
);
router.get(
  "/posts/create-post",

  (req, res, next) => {
    return res.render("createPostForm");
  }
);

router.post(
  "/posts/create-post",

  postController.createPost
);

router.delete("/posts/:id", postController.deletePost);

router.get("/posts/:id/update", postController.updatePostGet);
router.put("/posts/:id/update", postController.updatePostPut);

router.delete("/posts/:id", commentController.deleteComment);

module.exports = router;
