const Admin = require("../models/admin");
var bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.adminSignUp = asyncHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const admin = new Admin({
      username: req.body.username,
      password: hashedPassword,
    });

    await admin.save();
    res.json({ msg: "registered" });
  });
});

exports.adminLogIn = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username: username }).exec();
  console.log(admin);
  if (!admin) {
    return res.status(403).json({ message: "Incorrect username" });
  }

  const match = await bcrypt.compare(password, admin.password);
  console.log(match);
  if (!match) {
    return res.status(403).json({ message: "Incorrect password" });
  }

  const opts = {};
  opts.expiresIn = 1000 * 60 * 60 * 24;
  const secret = process.env.SECRET_KEY;
  const adminId = admin._id;
  const token = await jwt.sign(
    { adminId, isAdmin: admin.isAdmin },
    secret,
    opts
  );
  console.log("token", token);
  return res.status(200).json({ token: `Bearer ${token}` });
});
