var express = require("express");
var router = express.Router();

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

/* GET home page. */

router.get("/", postController.postListGet);

router.get("/:id", postController.postGet);
// router.get("/:id", (req, res) => res.render("post"));

router.post("/:id", commentController.createCommentPost);

router.use("/admin", require("./admin"));

module.exports = router;
