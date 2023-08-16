const asyncHandler = require("express-async-handler");
const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.deleteComment = asyncHandler(async (req, res, next) => {
  await Comment.findByIdAndRemove(req.body.commentID);
});

exports.createCommentPost = [
  body("username").optional().trim().escape(),
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Write something")
    .isLength({ max: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const comment = new Comment({
      username: req.body.username,
      text: req.body.text,
    });

    if (!errors.isEmpty()) {
      res.json({ comment });
    } else {
      await comment.save();
      const post = await Post.findById(req.params.id);
      post.commentsID.push(post._id);
      await post.save();
      res.redirect(`/posts/${req.params.id}`);
    }
  }),
];
