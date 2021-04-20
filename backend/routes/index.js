const express = require("express");

const topics = require("./topics");

const router = express.Router();

router.use("/topics", topics);

module.exports = router;
