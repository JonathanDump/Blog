const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const CommentSchema = new Schema(
  {
    username: {
      type: String,
      default: "Anonymous",
      minLength: 1,
      maxLength: 100,
    },
    text: { type: String, required: true, minLength: 1, maxLength: 600 },
    date: { type: Date, default: Date.now },
  },
  { collation: "comments" }
);

CommentSchema.virtual("formattedDate").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Comment", CommentSchema);
