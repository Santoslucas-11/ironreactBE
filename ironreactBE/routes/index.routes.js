const router = require("express").Router();

//coments
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
