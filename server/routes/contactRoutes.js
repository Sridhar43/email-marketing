const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
  importContacts,
} = require("../controllers/contactController");

const { auth } = require("../middlewares/authMiddlewares");
import  upload from "../middlewares/upload";

router.post("/create", auth, createContact);
router.get("/all", auth, getAllContacts);
router.put("/update/:id", auth, updateContact);
router.delete("/update/:id", auth, deleteContact);
router.post("/import", auth, upload.single("file"), importContacts);

module.exports = router;


