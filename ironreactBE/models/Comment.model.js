const { Schema, model } = require("mongoose");

const comentSchema = new Schema({
  title: String,
  description: String,
  // subjectId: {type: Schema.Types.ObjectId, ref:'Subject'},
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Coment", comentSchema);
