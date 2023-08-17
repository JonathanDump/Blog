const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.postListGet = asyncHandler(async (req, res, next) => {
  console.log("getting posts");
  const posts = await Post.find().exec();
  if (posts.length) {
    res.json({ posts });
  } else {
    res.json({ posts: [] });
  }
});

exports.postGet = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("commentsID").exec();
  console.log(post);
  if (post) {
    res.json(post);
  } else {
    res.json({});
  }
});

exports.createPost = [
  body("title").optional().trim().escape(),
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("There must be something")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      commentsID: [],
    });

    if (!errors.isEmpty()) {
      res.json({ post });
    } else {
      await post.save();
      res.redirect("/admin/posts");
    }
  }),
];

exports.deletePost = asyncHandler(async (req, res, next) => {
  await Post.findByIdAndRemove(req.body.postID).exec();
});

exports.updatePostGet = asyncHandler(async (req, res, next) => {
  const post = Post.findById(rea.params.id).exec();
  res.json(post);
});

exports.updatePostPut = [
  body("title").optional().escape(),
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("There must be something")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      text: req.body.text,
    });

    if (!errors.isEmpty()) {
      res.json({ post });
    } else {
      const post = await Post.findByIdAndUpdate(req.params.id, post, {}).exec();
      res.redirect(`/admin/posts/${post._id}`);
    }
  }),
];
