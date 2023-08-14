const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema(
  {
    title: { type: String, maxLength: 100 },
    text: { type: String, required: true, minLength: 1 },
    date: { type: Date, default: Date.now },
    isVisible: { type: Boolean, default: true },
    commentsID: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { collection: "posts" }
);

PostSchema.virtual("formattedDate").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
