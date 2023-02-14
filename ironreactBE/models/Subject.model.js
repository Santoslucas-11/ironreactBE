const { Schema, model } = require("mongoose");

const subjectSchema = new Schema({
  title: String,
  description: String,
  imageUrl: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = model("Subject", subjectSchema);
