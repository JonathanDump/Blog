var express = require("express");
var router = express.Router();

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

/* GET home page. */
router.get("/", (req, res, next) => res.redirect("/posts"));
router.get("/posts", postController.postListGet);

router.get("/posts/:id", postController.postGet);

router.post("/posts/:id", commentController.createCommentPost);

router.use("/admin", require("./admin"));

module.exports = router;
