const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/authMiddlewares");
const { sendTestEmail } = require("../controllers/emailController");

router.post("/send", auth, sendTestEmail);

module.exports = router;