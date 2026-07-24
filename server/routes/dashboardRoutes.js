const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/authMiddlewares");
const { getDashboardStats } = require("../controllers/dashboardController");

router.get("/", auth, getDashboardStats);

module.exports = router;