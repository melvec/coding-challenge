const express = require("express");
const router = express.Router();

const { getResults } = require("../controllers/calculationsController");
router.get("/", getResults);

module.exports = router;
