const { Schema, model } = require("mongoose");

const comentSchema = new Schema({
    title: String,
    description: String,
    subjectId: {type: Schema.Types.ObjectId, ref:'Subject'},
});

module.exports = model("Coment", comentSchema);