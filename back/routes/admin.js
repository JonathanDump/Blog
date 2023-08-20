var express = require("express");
var router = express.Router();

const adminController = require("../controllers/adminController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const passport = require("passport");

router.get("/", (req, res) => res.json({ message: "Admin" }));

// router.get("/log-in", (req, res) => {
//   res.render("adminLogInForm");
// });
router.post("/log-in", adminController.adminLogIn);

// router.get("/sign-up", (req, res, next) => {
//   res.render("adminSignUpForm");
// });
router.post("/sign-up", adminController.adminSignUp);

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postController.postListGet
);

router.post("/posts/create-post", postController.createPost);

router.get("/posts/:id", postController.postGet);
router.delete("/posts/:id", postController.deletePost);

router.delete("/posts/:id/comment/delete", commentController.deleteComment);

router.get("/posts/:id/update", postController.updatePostGet);
router.put("/posts/:id/update", postController.updatePostPut);

module.exports = router;
