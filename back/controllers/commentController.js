const asyncHandler = require("express-async-handler");
const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const [post, comment] = await Promise.all([
    Post.findOne({ commentsID: req.body.commentID })
      .populate("commentsID")
      .exec(),
    Comment.findByIdAndRemove(req.body.commentID).exec(),
  ]);
  console.log(post);
  res.status(200).json(post);
});

exports.createCommentPost = [
  body("username").optional().trim().escape(),
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Write something")
    .isLength({ max: 600 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    console.log("creating post");
    // console.log("username", req.body.username);
    // console.log("text", req.body.text);
    console.log("req", req.body);

    const errors = validationResult(req);

    const comment = new Comment({
      username: req.body.username,
      text: req.body.text,
    });

    if (!errors.isEmpty()) {
      console.log("comment error", errors);
      res.json(comment);
    } else {
      console.log("saving comment", comment);
      await comment.save();
      const post = await Post.findById(req.params.id).exec();
      post.commentsID.push(comment._id);
      await post.save();
      // res.redirect(`/${req.params.id}`);
      res.json(post);
    }
  }),
];
