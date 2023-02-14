const { isAuthenticated } = require('../middlewares/jwt.middleware');
const Comment = require("../models/Comment.model");
const router = require("express").Router();
const Subject = require("../models/Subject.model");

//GET - gets all subjects
router.get("/subjects", async (req, res) => {
  try {
    const response = await Subject.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//POST - create a subject
router.post("/subjects", isAuthenticated, async (req, res) => {
  try {
    console.log("user id", req.payload._id);
    const userId = req.payload._id;
    const { title, description, imageUrl } = req.body;
    if (!title || !description) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const response = await Subject.create({ title, description, imageUrl });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//POST - create comments
router.post("/comments", isAuthenticated, async (req, res) => {
  try {
    console.log("user id", req.payload._id);
    const userId = req.payload._id;
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const response = await Comment.create({ title, description });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//DELETE - delete a comment
router.delete("/comment/:commentId", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.projectId);
    res
      .status(200)
      .json({ message: `Project with id ${req.params.projectId} was deleted` });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//GET ONE subject
router.get("/subject/:subjectId", async (req, res) => {
  try {
    const response = await Subject.findById(req.params.subjectId);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//POST create tasks
router.post("/comment", async (req, res) => {
  try {
    const { title, description, subjectId } = req.body;
    //1. Create the task
    const response = await Comment.create({ title, description, subjectId });
    //2. Update the project by pushing the task id to its tasks array
    const SubjectResponse = await Subject.findByIdAndUpdate(
      subjectId,
      {
        $push: { comments: response._id },
      },
      { new: true }
    );
    res.status(200).json(SubjectResponse);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
