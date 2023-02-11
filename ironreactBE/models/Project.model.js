const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,
    comments: [],
});

module.exports = model("Project", projectSchema);