const express = require("express");
const router = express.Router();

const { getRevenue } = require("../controllers/revenueController");
router.get("/", getRevenue);

module.exports = router;
