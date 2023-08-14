const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
require("dotenv").config();
const Admin = require("../models/admin");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = new JwtStrategy(opts, async (jwt_payload, done) => {
  console.log("paylod", jwt_payload.adminId);
  const admin = await Admin.findOne({ _id: jwt_payload.adminId });

  if (!admin) {
    return done(null, false);
  }
  return done(null, true);
});
