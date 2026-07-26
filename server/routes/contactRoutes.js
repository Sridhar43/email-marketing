import express  from "express";
const router = express.Router();

import {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
  importContacts,
} from "../controllers/contactController.js";

import   {auth}  from "../middlewares/authMiddlewares.js";
import  upload from "../middlewares/upload.js";

router.post("/create", auth, createContact);
router.get("/all", auth, getAllContacts);
router.put("/update/:id", auth, updateContact);
router.delete("/update/:id", auth, deleteContact);
router.post("/import", auth, upload.single("file"), importContacts);

export default router;


